import React from "react";

const Blog = () => {
  return (
    <div className="blog-list">
      <div className="blog-list__item card blog-item">
        <div className="card-header">
          <div class="author">
            <div class="author__avatar"></div>
            <div class="author__text">
              <div class="author__name">Айгерим</div>
              <div class="author__date">26.01.2023</div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="card-main">
          <div className="card-main__title">Легкий способ бросить худеть</div>
        </div>
        <div
          class="card-main__img"
          style={{ padding: "16px", marginBottom: "0" }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/my-food-diary-f22bb.appspot.com/o/images%2FJunior%20FE%20Roadmap.pnge3ffe502-4b21-47a3-85a8-c9ca0a9718c9?alt=media&amp;token=310dda17-e1bc-4f1a-aa09-3fed442d79fc"
            style={{ maxWidth: "200px" }}
            alt="Тест 2"
          />
        </div>
      </div>
      <div className="blog-list__item card blog-item">
        <div className="card-header">
          <div class="author">
            <div class="author__avatar"></div>
            <div class="author__text">
              <div class="author__name">Айгерим</div>
              <div class="author__date">26.01.2023</div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="card-main">
          <div className="card-main__title">Легкий способ бросить худеть</div>
        </div>
        <div
          class="card-main__img"
          style={{ padding: "16px", marginBottom: "0" }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/my-food-diary-f22bb.appspot.com/o/images%2FJunior%20FE%20Roadmap.pnge3ffe502-4b21-47a3-85a8-c9ca0a9718c9?alt=media&amp;token=310dda17-e1bc-4f1a-aa09-3fed442d79fc"
            style={{ maxWidth: "200px" }}
            alt="Тест 2"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
