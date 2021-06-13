import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory, getCategoryDetails, clearErrors } from '../../actions/productActions'
import { UPDATE_CATEGORY_RESET } from '../../constants/productConstants'

const UpdateCategory = ({ match, history }) => {

    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [description, setDescription] = useState('');


    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, category } = useSelector(state => state.categoryDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.category);

    const categoryId = match.params.id;

    useEffect(() => {

        if (category && category._id !== categoryId) {
            dispatch(getCategoryDetails(categoryId));
        } else {
            setTitle(category.title);
            setTag(category.tag);
            setDescription(category.description);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            history.push('/admin/categories');
            alert.success('Category updated successfully');
            dispatch({ type: UPDATE_CATEGORY_RESET })
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, category, categoryId])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', title);
        formData.set('price', tag);
        formData.set('description', description);


        dispatch(updateCategory(category._id, formData))
    }




    return (
        <Fragment>
            <MetaData title={'Update Category'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Category</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Title</label>
                                    <input
                                        type="text"
                                        id="title_field"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tag_field">Tag</label>
                                    <input
                                        type="text"
                                        id="tag_field"
                                        className="form-control"
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                {/*<div className="form-group">*/}
                                {/*    <label htmlFor="category_field">Category</label>*/}
                                {/*    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>*/}
                                {/*        {categories.map(category => (*/}
                                {/*            <option key={category} value={category} >{category}</option>*/}
                                {/*        ))}*/}

                                {/*    </select>*/}
                                {/*</div>*/}


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                            </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateCategory
