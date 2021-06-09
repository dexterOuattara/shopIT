import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminCategories, deleteCategory, clearErrors } from '../../actions/productActions'
import { DELETE_CATEGORY_RESET } from '../../constants/productConstants'

const CategoriesList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, categories } = useSelector(state => state.categories);
    const { error: deleteError, isDeleted } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(getAdminCategories());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Category deleted successfully');
            history.push('/admin/categories');
            dispatch({ type: DELETE_CATEGORY_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setCategories = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Tag',
                    field: 'tag',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        categories.forEach(category => {
            data.rows.push({
                id: category._id,
                title: category.title,
                description: `$${category.description}`,
                tag: category.tag,
                actions: <Fragment>
                    <Link to={`/admin/category/${category._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteCategoryHandler(category._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Categories'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Categories</h1>
                        <Link to="/admin/category/new"><i className="btn btn-primary fa fa-plus"> Add Category</i></Link>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setCategories()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default CategoriesList
