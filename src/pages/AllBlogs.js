import React, { useEffect, useState } from "react";
import { ref, limitToLast, onValue, query } from "firebase/database";
import { database } from "../firebase-config";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  let limitNumber = 1;

  useEffect(() => {
    const recipes = ref(database, "blogs");
    const lastTenArticlesQuery = query(recipes, limitToLast(limitNumber));
    const unregisterFunction = onValue(lastTenArticlesQuery, (snapshot) => {
      const newValObj = snapshot.val();
      const keys = Object.entries(newValObj);
      setBlogs(keys);
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, [limitNumber]);

  return (
    <div className="blog-list">
      {blogs.length > 0 &&
        blogs.map((blog, i) => (
          <div className="blog-list__item card blog-item" key={i + blog[0]}>
            <div className="card-header">
              <div className="author">
                <div className="author__avatar">
                  {blog[1]?.author[0].toUpperCase()}
                </div>
                <div className="author__text">
                  <div className="author__name">{blog[1]?.author}</div>
                  <div className="author__date">
                    {blog[1]?.createdAt &&
                      format(new Date(blog[1]?.createdAt), "dd.MM.yyyy")}
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="card-main">
              <Link to={`/blogs/${blog[0]}`} className="card-main__title">
                {blog[1]?.title}
              </Link>
            </div>
            <div
              className="card-main__img"
              style={{ padding: "16px", marginBottom: "0" }}
            >
              <img
                src={blog[1]?.image}
                style={{ maxWidth: "200px" }}
                alt={blog[1]?.title}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllBlogs;
