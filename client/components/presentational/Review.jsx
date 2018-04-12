import React from 'react';
// import PropTypes from 'prop-types';

const Review = () => (
  <div>
    <div className="bus-info-reviews">
      <h3>Reviews</h3>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="post-form">
              <div className="comment-contents">
                <a href="#" className="comment-author" title="Comment Author">
                  <h4>John Jilius</h4>
                </a>
                <p>Hi, this is my comment on your article
                 please go ahead and edit or delete it
                 and then go to the website!</p>
                <small className="text-muted"> 31 minutes ago</small>
              </div>
              <div className="comment-contents">
                <a href="#" className="comment-author" title="Comment Author">
                  <h4>John Jilius</h4>
                </a>
                <p>Hi, this is my comment on your article
                 please go ahead and edit or delete it
                  and then go to the website!</p>
                <small className="text-muted"> 31 minutes ago</small>
              </div>
              <textarea />
              <a href="#" className="btn send-button">Add review</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Review.propTypes = {

};

export default Review;
