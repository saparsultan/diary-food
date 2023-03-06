import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { format } from "date-fns";
import { database } from "../firebase-config";

const BlogCard = ({ idBlog }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const itemRef = ref(database, `blogs/${idBlog}`);
    onValue(
      itemRef,
      (snapshot) => {
        const itemData = snapshot.val() ? snapshot.val() : null;
        setItem(itemData);
      },
      {}
    );
  }, [idBlog]);

  return (
    <div className="card__container">
      <div className="card">
        <div className="card-header">
          <div className="author">
            <div className="author__avatar">
              {item?.author && item?.author[0].toUpperCase()}
            </div>
            <div className="author__text">
              <div className="author__name">{item?.author}</div>
              <div className="author__date">
                {item?.createdAt &&
                  format(new Date(item?.createdAt), "dd.MM.yyyy")}
              </div>
            </div>
          </div>
        </div>
        <div className="card-main">
          <div className="card-main__title">{item?.title}</div>
          <div className="card-main__img">
            <img src={item?.image} alt={item?.title} />
          </div>
          <p className="card-p">{item?.text}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
