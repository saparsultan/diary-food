import React from "react";

const CreateBlog = () => {
  const [heading, setHeading] = React.useState("");
  const [newDescription, setNewDescription] = React.useState(null);
  const [imageUpload, setImageUpload] = React.useState();

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUpload(e.target.files[0]);
    }
  };

  const removeSelectedImage = (e) => {
    e.preventDefault();
    setImageUpload();
  };

  return (
    <div className="form-block">
      <div className="form-item">
        <label className="form-item__label">Загловок:</label>
        <input
          type="text"
          value={heading}
          required
          className="form-item__input"
          placeholder="Введите заголовок"
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label className="form-item__label">Текст:</label>
        <textarea
          type="text"
          value={newDescription}
          name="desc"
          required
          className="form-item__input"
          placeholder="Напишите текст для статьи"
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label className="form-item__label">Фотография:</label>
        <div className="form-item__img-block">
          {imageUpload === undefined && (
            <>
              <label
                htmlFor="toUploadAPicture"
                className="btn btn--upload"
                style={{ textAlign: "center" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9V15M15 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                    stroke="#019852"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Добавить фото
              </label>
              <input
                id="toUploadAPicture"
                accept="image/*"
                type="file"
                onChange={onFileChange}
                style={{ display: "none" }}
              />
            </>
          )}

          {imageUpload && (
            <div className="form-item__img-wrap">
              <div className="form-item__img-prev">
                <img
                  src={URL.createObjectURL(imageUpload)}
                  alt={imageUpload.name}
                />
              </div>
              <button className="btn" onClick={removeSelectedImage}>
                Удалить
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
