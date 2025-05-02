import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const scoreOptions = [
  { value: 1, label: "Horrible", color: "#ff4545" },
  { value: 2, label: "Bad", color: "#ffa534" },
  { value: 3, label: "Okay", color: "#ffe234" },
  { value: 4, label: "Good", color: "#b7dd29" },
  { value: 5, label: "Excellent", color: "#57e32c" },
];

const SERVER_URL = "http://localhost:4000/api/review";
const ALL_REVIEWS_ROUTE = `${SERVER_URL}/all`;
const SUBMIT_REVIEW_ROUTE = `${SERVER_URL}/update`;
const DELETE_REVIEW_ROUTE = `${SERVER_URL}/delete`;

const ReviewTemplate = () => {
  const { token } = useContext(StoreContext);
  const [reviewByUser, setReviewByUser] = useState({ text: "", score: -1 });
  const [reviews, setReviews] = useState([]);

  const fetchReviewsAction = useCallback(async () => {
    const response = await axios.get(ALL_REVIEWS_ROUTE, { headers: { token } });
    if (response.data.reviewByUser) {
      setReviewByUser(response.data.reviewByUser);
    }

    setReviews(response.data.reviews);
  }, [token]);

  const submitReviewAction = useCallback(async () => {
    await axios.post(
      SUBMIT_REVIEW_ROUTE,
      {
        text: reviewByUser.text,
        score: reviewByUser.score,
      },
      { headers: { token } }
    );

    fetchReviewsAction();
  }, [reviewByUser.score, reviewByUser.text, token, fetchReviewsAction]);

  const deleteReviewAction = useCallback(async () => {
    await axios.delete(DELETE_REVIEW_ROUTE, { headers: { token } });

    setReviewByUser({ text: "", score: -1 });

    fetchReviewsAction();
  }, [fetchReviewsAction, token]);

  useEffect(() => {
    fetchReviewsAction();
  }, [fetchReviewsAction]);

  return (
    <>
      <div
        style={{ display: "block", justifyContent: "center", width: "60vw" }}
      >
        {/* {token ? isReviewed ? <>update/delete</> : <>create</> : <>dont show</>} */}
        <section>
          <h2 style={{ marginBottom: "20px" }}>Your Review</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "10px",
            }}
          >
            {scoreOptions.map((option) => (
              <div
                key={option.value}
                style={{
                  padding: "20px",
                  border: `2px solid ${
                    reviewByUser.score === option.value ? option.color : "#ccc"
                  }`,
                  borderRadius: "5px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "border-color 0.3s, color 0.3s",
                  color:
                    reviewByUser.score === option.value
                      ? option.color
                      : "black", // Change text color on click
                }}
                onClick={() =>
                  setReviewByUser((prev) => ({ ...prev, score: option.value }))
                }
              >
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {option.label}
                </div>
              </div>
            ))}
          </div>
          <textarea
            placeholder="Write your review here..."
            rows="4"
            style={{ width: "100%", padding: "10px", marginTop: "20px" }}
            value={reviewByUser.text}
            onChange={(e) => {
              setReviewByUser((prev) => ({ ...prev, text: e.target.value }));
            }}
          />
          <div style={{ display: "flex" }}>
            <button
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: reviewByUser.score === -1 ? "gray" : "#3ba5ff", // Set button background color to blue
                color: "white", // Set button text color to white
                border: "none", // Remove default border
                borderRadius: "5px", // Add border radius for rounded corners
                cursor: "pointer", // Change cursor to pointer
                transition: "background-color 0.3s", // Add transition for background color
              }}
              onClick={submitReviewAction}
              disabled={reviewByUser.score === -1}
            >
              Submit Review
            </button>

            {reviewByUser.userName ? (
              <button
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  padding: "10px",
                  backgroundColor: "red", // Set button background color to blue
                  color: "white", // Set button text color to white
                  border: "none", // Remove default border
                  borderRadius: "5px", // Add border radius for rounded corners
                  cursor: "pointer", // Change cursor to pointer
                  transition: "background-color 0.3s", // Add transition for background color
                }}
                onClick={deleteReviewAction}
              >
                Delete Review
              </button>
            ) : null}
          </div>
        </section>

        <section>
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ marginBottom: "20px" }}>Reviews</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "20px",
              }}
            >
              {reviews.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "100px", // Increased width (50px * 3)
                      height: "100px", // Increased height (50px * 3)
                      border: `2px solid ${scoreOptions[item.score - 1].color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: scoreOptions[item.score - 1].color,
                      fontWeight: "bold",
                      fontSize: "36px", // Increased font size (12px * 3)
                      marginRight: "10px",
                      backgroundColor: "transparent", // Keep background transparent
                    }}
                  >
                    {item.score}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "18px" }}>{item.text}</div>
                    <div
                      style={{
                        fontSize: "16px",
                        marginTop: "5px",
                        color: "gray",
                      }}
                    >
                      - {item.userName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReviewTemplate;
