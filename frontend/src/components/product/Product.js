import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product, col }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product.images[0].url} alt="product"
                />
                <div className="card-body d-flex flex-column">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-title text-left">
                                <Link to={`/product/${product._id}`}>{product.name}</Link>
                            </h5>                        </div>
                        <div className="col-md-6 text-right">
                            <p className="card-text">${product.price}</p>
                        </div>
                    </div>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews})</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product
