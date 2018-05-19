import React from 'react';
import PropTypes from 'prop-types';
import Review from '../container/Review';
import EditModal from '../container/EditModal';

const BusinessInfo = ({
  userId, name, details, location,
  category, deleteHandler, image, userAuth,
  allCategories, id, moreReviews
}) =>
  (
    <div>
      <div className="business-image">
        {
          !image ?
            <img alt="User Pic"
              src="/images/background.png"
              className="img-fluid"/> :
            <img alt="User Pic"
              src={`http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/${image}`}
              className="img-fluid"/>
        }
        <div className="overlay">
          <div className="text-center">
            <span className="word-wrap">{name}</span>
          </div>

        </div>
      </div>
      <div className="row grouped-buttons">
        <div className="bus-info">
          <span>
            <a href="#" className="active" id="my-Info">Business-Info</a>
          </span>
        </div>
        <div className="bus-reviews">
          <span>
            <a href="#reviews" className="active">Reviews</a>
          </span>
        </div>
      </div>
      <div className="content-display">
        <div className="bus-info-details" style={{ display: "block" }}>
          <h3>Business-Info</h3>
          <div className="business-content">
            <h5>
              <span>Name:</span> {name}</h5>
            <h5>
              <span>Location:</span> {location}</h5>
            <h5>
              <span>Category:</span> {category}</h5>

            <h5>
              <span>Details</span>:
              <p className="word-wrap">
                {details}
              </p>
            </h5>
          </div>
          {userAuth === userId ?
            <div className="icon-Images">
              <img src="/images/edit-icon-2375785_1280.png"
                alt="edit Icon" data-toggle="modal"
                data-target="#editModal"
                title="edit business"/>
              <img src="/images/delete-icon.png"
                alt="delete Icon"
                title="delete business"
                onClick={deleteHandler}/>
            </div> : ''

          }
          <EditModal
            id={+id}/>
          <hr/>
        </div>
        <Review
          id={+id}
          moreReviews={moreReviews}/>
      </div>
    </div>
  );


BusinessInfo.propTypes = {
  name: PropTypes.string,
  details: PropTypes.string,
  location: PropTypes.string,
  image: PropTypes.string,
  category: PropTypes.string,
  deleteHandler: PropTypes.func,
  userAuth: PropTypes.number,
  userId: PropTypes.number,
  allCategories: PropTypes.array,
  id: PropTypes.number,
  moreReviews: PropTypes.func,
};

export default BusinessInfo;
