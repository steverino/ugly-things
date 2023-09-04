const PreviewImage = ({title, description,refTitle, refDesc,refImage,selectedFile, setSelectedFile}) => {
  return (
    <>
      <div>
        <div>{title}</div>
        <img
          alt="not found"
          width={"250px"}
          src={URL.createObjectURL(selectedFile)}
        />
        <div>{description}</div>
        <br />
        <button
          onClick={() => {
            setSelectedFile(null); //Removes image
            refTitle.current.value = ""; //removes text field
            refDesc.current.value = ""; //removes text field
            refImage.current.value = ""; //removes text field
          }}
        >
          Remove
        </button>
        <br />
        <br />
      </div>
      
    </>
  );
};

export default PreviewImage;
