import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory, getCategoryDetails, clearErrors } from '../../actions/productActions'
import { UPDATE_CATEGORY_RESET } from '../../constants/productConstants'

const UpdateCategory = ({ match, history }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');

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
            setDescription(category.description);
            setTag(category.tag);
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
        formData.set('title', title);
        formData.set('tag', tag);
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
                                    <label htmlFor="title_field">Title</label>
                                    <input
                                        type="text"
                                        id="title_field"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <input
                                        type="textarea"
                                        id="description_field"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
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
