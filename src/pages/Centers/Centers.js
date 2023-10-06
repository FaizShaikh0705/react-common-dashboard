import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../config/Fire';
import { storage } from "../../config/Fire";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from '../../context/Auth';
import $ from 'jquery';
import parse from 'html-react-parser';
import Loader from "../../common/Loader/Loader";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CenterData from '../../components/CenterData/CenterData';

var metadata = {
  contentType: 'image/jpeg',
};
var tem = 1;
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          let storage = firebase.storage().ref();
          let uploadTask = storage
            .child(`/images/CenterData/${file.name}`)
            .put(file, metadata);
          uploadTask.on(
            console.log(uploadTask + "--------------------------------"),
            function () {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  resolve({
                    default: downloadURL
                  });
                });
            }
          );
        })
    );
  }
}

function Center(props) {
  const [showModal, setShowModal] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const [postPosition, setPostPosition] = useState("");
  const [postTopic, setPostTopic] = useState("");
  const [postTopic1, setPostTopic1] = useState("");
  const [postTopic2, setPostTopic2] = useState("");
  const [postTopic3, setPostTopic3] = useState("");
  const [postLongDescription, setPostLongDescription] = useState("");
  const [postLongDescription1, setPostLongDescription1] = useState("");
  const [postLongDescription2, setPostLongDescription2] = useState("");
  const [postLongDescription3, setPostLongDescription3] = useState("");
  const [postIsActive, setPostIsActive] = useState("");
  const [formComplete, setFormComplete] = useState(false);
  const [formIncompleteError, setFormIncompleteError] = useState(false);

  const [postPositionNo, setPostPositionNo] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postTopicName, setPostTopicName] = useState("");
  const [postTopicName1, setPostTopicName1] = useState("");
  const [postTopicName2, setPostTopicName2] = useState("");
  const [postTopicName3, setPostTopicName3] = useState("");
  const [postLongDetail, setPostLongDetail] = useState("");
  const [postLongDetail1, setPostLongDetail1] = useState("");
  const [postLongDetail2, setPostLongDetail2] = useState("");
  const [postLongDetail3, setPostLongDetail3] = useState("");
  const [postIsActiveStatus, setPostIsActiveStatus] = useState("");
  const [postTimestamp, setPostTimestamp] = useState("");
  const [postWhatsappLink, setPostWhatsappLink] = useState("");
  const [postCallLink, setPostCallLink] = useState("");
  const [postEmailLink, setPostEmailLink] = useState("");
  const [postMapLink, setPostMapLink] = useState("");

  const [postData, setPostData] = useState("");
  const [isPostAdded, setIsPostAdded] = useState(false);
  const [isPostEdited, setIsPostEdited] = useState(false);
  const [isPostDelete, setIsPostDelete] = useState(false);

  const [whatsappLink, setWhatsappLink] = useState("");
  const [callLink, setCallLink] = useState("");
  const [emailLink, setEmailLink] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [editLocation, setEditLocation] = useState("");

  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [url2, setURL2] = useState("");
  const [file3, setFile3] = useState(null);
  const [url3, setURL3] = useState("");
  const [file4, setFile4] = useState(null);
  const [url4, setURL4] = useState("");
  const [file5, setFile5] = useState(null);
  const [url5, setURL5] = useState("");
  const [url, setURL] = useState("");

  const [editDetails, setEditDetails] = useState(false);

  const [postId, setPostId] = useState("");

  const [postImage2, setPostImage2] = useState("");
  const [postImage3, setPostImage3] = useState("");
  const [postImage4, setPostImage4] = useState("");
  const [postImage5, setPostImage5] = useState("");

  const postTopics = React.useRef();
  const postTopics1 = React.useRef();
  const postTopics2 = React.useRef();
  const postTopics3 = React.useRef();
  const postPositions = React.useRef();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsPostAdded(false);
    setIsPostEdited(false);
    setIsPostDelete(false);
    getPostData();
    // filterStatus();
  }, [isPostAdded, isPostEdited, isPostDelete]);

  function handleChange(e) {
    const file = e.target.files[0];
    setFile(file);
  }

  function handleFile2Change(e) {
    const file = e.target.files[0];
    setFile2(file);
  }

  function handleFile3Change(e) {
    const file = e.target.files[0];
    setFile3(file);
  }

  function handleFile4Change(e) {
    const file = e.target.files[0];
    setFile4(file);
  }

  function handleFile5Change(e) {
    const file = e.target.files[0];
    setFile5(file);
  }

  function handleUpload(e) {
    e.preventDefault();
    var today = new Date();
    var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();

    const uploadPromises = [];

    if (file) {
      const uploadTask = storage.ref(`/images/center/${time + "_" + file.name}`).put(file);
      uploadPromises.push(uploadTask);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images/center")
          .child(time + "_" + file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setURL(url);
          });
      });
    }

    if (file2) {
      const uploadTask2 = storage.ref(`/images/center/${time + "_image2_" + file2.name}`).put(file2);
      uploadPromises.push(uploadTask2);
      uploadTask2.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images/center")
          .child(time + "_image2_" + file2.name)
          .getDownloadURL()
          .then((url) => {
            setFile2(null);
            setURL2(url);
          });
      });
    }

    if (file3) {
      const uploadTask3 = storage.ref(`/images/center/${time + "_image3_" + file3.name}`).put(file3);
      uploadPromises.push(uploadTask3);
      uploadTask3.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images/center")
          .child(time + "_image3_" + file3.name)
          .getDownloadURL()
          .then((url) => {
            setFile3(null);
            setURL3(url);
          });
      });
    }

    if (file4) {
      const uploadTask4 = storage.ref(`/images/center/${time + "_image4_" + file4.name}`).put(file4);
      uploadPromises.push(uploadTask4);
      uploadTask4.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images/center")
          .child(time + "_image4_" + file4.name)
          .getDownloadURL()
          .then((url) => {
            setFile4(null);
            setURL4(url);
          });
      });
    }

    if (file5) {
      const uploadTask5 = storage.ref(`/images/center/${time + "_image5_" + file5.name}`).put(file5);
      uploadPromises.push(uploadTask5);
      uploadTask5.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images/center")
          .child(time + "_image5_" + file5.name)
          .getDownloadURL()
          .then((url) => {
            setFile5(null);
            setURL5(url);
          });
      });
    }

    Promise.all(uploadPromises)
      .then(() => {
        // All uploads completed
        console.log("All images uploaded successfully.");

        // Additional logic after all uploads
        // For example, update your database with the image URLs
        updateDatabaseWithImageURLs();
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        // Handle errors that occurred during image uploads
      });
  }

  function updateDatabaseWithImageURLs() {
    // Placeholder function to update the database with image URLs
    console.log('Updating database with image URLs');
    // Implement your logic here to update the database with the image URLs
  }


  const getPostData = () => {
    // Axios
    // .get(`https://safari-kids-dashboard-default-rtdb.firebaseio.com/center.json`)
    firebase.database().ref(`center`).get()
      .then((response) => {
        // setPostData(response.data)
        setTimeout(setPostData(response.val()), 5000);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleAddPostData = (e) => {
    //   check if all input is taken
    if (postPositions.current.value.length === 0 || postTopics.current.value.length === 0) {
      setFormComplete(false);
      setFormIncompleteError(true);
    } else {
      if (editDetails) {
        // Axios
        // .put(`https://educaretech-dashboard-default-rtdb.firebaseio.com/SessionData/${postId}.json`,
        firebase.database().ref(`center/${postId}`).set(
          {
            postPositionNo: postPositionNo === "" ? postPosition : postPositionNo,
            postImage: postImage === "" ? url : postImage,
            postImage2: postImage2 === "" ? url2 : postImage2,
            postImage3: postImage3 === "" ? url3 : postImage3,
            postImage4: postImage4 === "" ? url4 : postImage4,
            postImage5: postImage5 === "" ? url5 : postImage5,
            postTopicName: postTopicName === "" ? postTopic : postTopicName,
            postTopicName1: postTopicName1 === "" ? postTopic1 : postTopicName1,
            postTopicName2: postTopicName2 === "" ? postTopic2 : postTopicName2,
            postTopicName3: postTopicName3 === "" ? postTopic3 : postTopicName3,
            postLongDetail: postLongDetail === "" ? postLongDescription : postLongDetail,
            postLongDetail1: postLongDetail1 === "" ? postLongDescription1 : postLongDetail1,
            postLongDetail2: postLongDetail2 === "" ? postLongDescription2 : postLongDetail2,
            postLongDetail3: postLongDetail3 === "" ? postLongDescription3 : postLongDetail3,
            postIsActiveStatus: postIsActiveStatus === "" ? postIsActive : postIsActiveStatus,
            postLocation: editLocation,
            postWhatsappLink: postWhatsappLink === "" ? whatsappLink : postWhatsappLink,
            postCallLink: postCallLink === "" ? callLink : postCallLink,
            postEmailLink: postEmailLink === "" ? emailLink : postEmailLink,
            postMapLink: postMapLink === "" ? mapLink : postMapLink,
            postusername: currentUser.displayName,
            Postuserprofile: currentUser.photoURL,
            postTimestamp: new Date().toUTCString(),
          }
        )
          .then((response) => {
            alert("Center edited succesfully");
            window.location.reload();
            setIsPostEdited(true);
          })
          .catch((error) => console.log("Error in editDetails" + error));
      }
      //  if user wants to add a new card
      else {
        // if user wants to edit then put request is used
        // Axios
        // .post(`https://educaretech-dashboard-default-rtdb.firebaseio.com/SessionData.json`,
        firebase.database().ref('center/').push(
          {
            postPositionNo: postPosition,
            postImage: url,
            postImage2: url2,
            postImage3: url3,
            postImage4: url4,
            postImage5: url5,
            postTopicName: postTopic,
            postTopicName1: postTopic1,
            postTopicName2: postTopic2,
            postTopicName3: postTopic3,
            postLongDetail: postLongDescription,
            postLongDetail1: postLongDescription1,
            postLongDetail2: postLongDescription2,
            postLongDetail3: postLongDescription3,
            postIsActiveStatus: postIsActive,
            postLocation: editLocation,
            postWhatsappLink: whatsappLink,
            postCallLink: callLink,
            postEmailLink: emailLink,
            postMapLink: mapLink,
            postusername: currentUser.displayName,
            Postuserprofile: currentUser.photoURL,
            postTimestamp: new Date().toUTCString(),

          }
        )
          .then((response) => {
            alert("Center added succesfully");
            // swal("succesful!", "post added succesfully!", "success");
            window.location.reload();
            setIsPostAdded(true);
          })
          .catch((error) => console.log("Error" + error));
      }

      setShowModal(false);

      setPostPositionNo("");
      setPostImage("");
      setPostImage2("");
      setPostImage3("");
      setPostImage4("");
      setPostImage5("");
      setPostTopicName("");
      setPostTopicName1("");
      setPostTopicName2("");
      setPostTopicName3("");
      setPostLongDetail("");
      setPostIsActiveStatus("");
      setPostTimestamp("");
      setEditLocation("");
      setPostWhatsappLink("");
      setPostCallLink("");
      setPostEmailLink("");
      setPostMapLink("");

    }
  };

  const handleEdit = (
    postTopic,
    postTopic1,
    postTopic2,
    postTopic3,
    url,
    url2,
    url3,
    url4,
    url5,
    postLongDescription,
    postLongDescription1,
    postLongDescription2,
    postLongDescription3,
    postPosition,
    postIsActive,
    postId,
    editedTime,
    editedLocation,
    whatsappLink,
    callLink,
    emailLink,
    mapLink,
    e
  ) => {
    setShowModal(true);
    setEditDetails(true);

    setPostTopic(postTopic);
    setPostTopic1(postTopic1);
    setPostTopic2(postTopic2);
    setPostTopic3(postTopic3);
    setURL(url);
    setURL2(url2);
    setURL3(url3);
    setURL4(url4);
    setURL5(url5);
    setPostLongDescription(postLongDescription);
    setPostLongDescription1(postLongDescription1);
    setPostLongDescription2(postLongDescription2);
    setPostLongDescription3(postLongDescription3);
    setPostPosition(postPosition);
    setPostIsActive(postIsActive);
    setPostId(postId);
    setEditLocation(editedLocation);
    setWhatsappLink(whatsappLink);
    setCallLink(callLink);
    setEmailLink(emailLink);
    setMapLink(mapLink)
  };

  // handles archive on card archive click
  const handleDelete = (postId, e) => {
    if (window.confirm("Are you sure you want to delete the Center?")) {
      // Axios
      // .delete(`https://educaretech-dashboard-default-rtdb.firebaseio.com/SessionData/${postId}.json`)
      firebase.database().ref(`center/${postId}`).remove()
        .then((response) => {
          alert("Center deleted succesfully");
          window.location.reload();
          setIsPostDelete(true);
        })
        .catch((error) => console.log("Error" + error));
    }
  };

  $(document).ready(function () {
    $('#search-input').keyup(function () {
      // Search text
      var text = $(this).val();
      // Hide all content className element
      $('.session-card').hide();
      // Search and show
      $('.session-card:contains("' + text + '")').show();
    });
  });

  //    const filterStatus = () => {
  //   $('.filter-status').on('change', function() {
  //       // alert( this.value);
  //       $('.session-card').css("display","none");
  //       $('.'+this.value).css("display","table-row");
  //       if(this.value == "all"){
  //         $('.session-card').css("display","table-row");
  //       }
  //   });
  // }

  const modalCloseHandler = () => { setShowModal(false); setEditDetails(false); setURL(false) };

  let modalContent = showModal ?

    (
      <>
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{editDetails ? "Edit Center" : "Add Center"}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalCloseHandler}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpload}>
                  <div className="form-group">
                    {formIncompleteError ? <p style={{ color: 'red' }}>Kindly complete the form before adding Column</p> : null}
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="editLocation">Center Location:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editLocation"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label for="topic">Center Tittle</label>
                      <input type="text" className="form-control" id="topic"
                        defaultValue={editDetails ? postTopic : ""}
                        ref={postTopics}
                        onChange={(event) => setPostTopic(event.target.value)}
                        placeholder="Enter Topic Name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="description">Upload Image</label>
                    <div className="custom-file">
                      <input type="file" onChange={handleChange} />
                      <button className="btn btn-dark btn-sm my-2 form-control" disabled={!file}>Click here to upload Image</button>
                      <img src={editDetails ? url : url} width="100" height="100" alt="upload" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="whatsappLink">WhatsApp Link:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editLocation"
                        value={whatsappLink}
                        onChange={(e) => setWhatsappLink(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="callLink">Call Link:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editLocation2"
                        value={callLink}
                        onChange={(e) => setCallLink(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="whatsappLink">Email Link:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editLocation3"
                        value={emailLink}
                        onChange={(e) => setEmailLink(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="description">Long Description</label>
                    {/* <div id="txtEditor1"></div> */}
                    <CKEditor
                      editor={ClassicEditor}
                      // data={postLongDescription}
                      data={editDetails ? postLongDescription : ""}
                      config={{
                        mediaEmbed: {
                          previewsInData: true
                        }
                      }}
                      onReady={editor => {
                        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                          return new MyUploadAdapter(loader);
                        };
                      }}
                      onChange={(center, editor) => {
                        const data = editor.getData();
                        setPostLongDescription(data);
                        console.log(data);
                      }}
                    >
                    </CKEditor>
                  </div>
                  <p>Center Activity</p>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label for="description">Activity Image 1</label>
                      <div className="custom-file">
                        <input type="file" onChange={handleFile2Change} />
                        <button className="btn btn-dark btn-sm my-2 form-control" disabled={!file2}>Click here to upload Image</button>
                        <img src={editDetails ? url2 : url2} width="100" height="100" alt="upload" />
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label for="description">Activity Image 2</label>
                      <div className="custom-file">
                        <input type="file" onChange={handleFile3Change} />
                        <button className="btn btn-dark btn-sm my-2 form-control" disabled={!file3}>Click here to upload Image</button>
                        <img src={editDetails ? url3 : url3} width="100" height="100" alt="upload" />
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label for="description">Activity Image 3</label>
                      <div className="custom-file">
                        <input type="file" onChange={handleFile4Change} />
                        <button className="btn btn-dark btn-sm my-2 form-control" disabled={!file4}>Click here to upload Image</button>
                        <img src={editDetails ? url4 : url4} width="100" height="100" alt="upload" />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="topic1">Activity Tittle 1</label>
                      <input type="text" className="form-control" id="topic"
                        defaultValue={editDetails ? postTopic1 : ""}
                        ref={postTopics1}
                        onChange={(event) => setPostTopic1(event.target.value)}
                        placeholder="Enter Topic Name" />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="topic2">Activity Tittle 2</label>
                      <input type="text" className="form-control" id="topic"
                        defaultValue={editDetails ? postTopic2 : ""}
                        ref={postTopics2}
                        onChange={(event) => setPostTopic2(event.target.value)}
                        placeholder="Enter Topic Name" />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="topic3">Activity Tittle 3</label>
                      <input type="text" className="form-control" id="topic"
                        defaultValue={editDetails ? postTopic3 : ""}
                        ref={postTopics3}
                        onChange={(event) => setPostTopic3(event.target.value)}
                        placeholder="Enter Topic Name" />
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className="form-group col-md-4">
                      <label for="description">Short Description</label>
                      {/* <div id="txtEditor1"></div> */}
                      <CKEditor
                        editor={ClassicEditor}
                        // data={postLongDescription}
                        data={editDetails ? postLongDescription1 : ""}
                        config={{
                          mediaEmbed: {
                            previewsInData: true
                          }
                        }}
                        onReady={editor => {
                          editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                            return new MyUploadAdapter(loader);
                          };
                        }}
                        onChange={(center, editor) => {
                          const data = editor.getData();
                          setPostLongDescription1(data);
                          console.log(data);
                        }}
                      >
                      </CKEditor>
                    </div>
                    <div className="form-group col-md-4">
                      <label for="description">Short Description</label>
                      {/* <div id="txtEditor1"></div> */}
                      <CKEditor
                        editor={ClassicEditor}
                        // data={postLongDescription}
                        data={editDetails ? postLongDescription2 : ""}
                        config={{
                          mediaEmbed: {
                            previewsInData: true
                          }
                        }}
                        onReady={editor => {
                          editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                            return new MyUploadAdapter(loader);
                          };
                        }}
                        onChange={(center, editor) => {
                          const data = editor.getData();
                          setPostLongDescription2(data);
                          console.log(data);
                        }}
                      >
                      </CKEditor>
                    </div>
                    <div className="form-group col-md-4">
                      <label for="description">Short Description</label>
                      {/* <div id="txtEditor1"></div> */}
                      <CKEditor
                        editor={ClassicEditor}
                        // data={postLongDescription}
                        data={editDetails ? postLongDescription3 : ""}
                        config={{
                          mediaEmbed: {
                            previewsInData: true
                          }
                        }}
                        onReady={editor => {
                          editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                            return new MyUploadAdapter(loader);
                          };
                        }}
                        onChange={(center, editor) => {
                          const data = editor.getData();
                          setPostLongDescription3(data);
                          console.log(data);
                        }}
                      >
                      </CKEditor>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="description">Center Google Review Image</label>
                    <div className="custom-file">
                      <input type="file" onChange={handleFile5Change} />
                      <button className="btn btn-dark btn-sm my-2 form-control" disabled={!file5}>Click here to upload Image</button>
                      <img src={editDetails ? url5 : url5} width="100" height="100" alt="upload" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="MapLink">Map Link:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editLocation"
                      value={mapLink}
                      onChange={(e) => setMapLink(e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="session">position</label>
                      <input type="text" className="form-control" id="session"
                        defaultValue={editDetails ? postPosition : ""}
                        ref={postPositions}
                        onChange={(event) => setPostPosition(event.target.value)}
                        placeholder="Enter session" />
                    </div>
                    <div className="form-group col-md-6">
                      <label for="status">Status</label>
                      <select id="status" className="form-control"
                        defaultValue={editDetails ? postIsActive : ""}
                        onChange={(event) => setPostIsActive(event.target.value)}>
                        <option selected>Select Session Status</option>
                        <option value="0">In-Active</option>
                        <option value="1">Active</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" disabled={formComplete} onClick={handleAddPostData} className="btn btn-sm btn-primary">Post</button>
              </div>
            </div>
          </div>
        </div >
      </>
    )
    : null;

  return (
    <>
      <Navbar />
      <div className="wrapper d-flex align-items-stretch">
        <Sidebar />

        <div className="container-fluid main bg-light py-5">
          <div className="row justify-content-center">
            <div className="col-lg-11">

              <div className="add-teacher-profile pb-3">
                <div className="d-flex justify-content-between">
                  <div className="title">
                    <h2 id="teach_profile">Centers</h2>
                    {/* <p>International Early Years Programs from Zero to Six. At Home and Online</p> */}
                  </div>
                  <div className="add-post-button">
                    <button onClick={() => setShowModal(true)} className="btn btn-dark btn-sm" data-toggle="modal" data-target="#exampleModal"><i className="fas fa-plus"></i></button>
                  </div>
                </div>
                <div className="m-content">
                  {modalContent}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-11">
                  <label for="inputEmail4">Search based on Center Name</label>
                  <input type="text" className="form-control" placeholder="search data" id="search-input" />
                </div>
                <div className="form-group col-md-1 reset-btn">
                  <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Reset</button>
                </div>
              </div>

              <div className="view-post">
                {/* <div className="post-datas">
                      <div className="card-deck"> */}
                {loading ? (
                  <Loader></Loader>
                ) : (
                  <div className="row" id="session-data">

                    {postData ?
                      Object.entries(postData).filter((status) => status[1].postIsActiveStatus == 1).sort((a, b) => a[1].postPositionNo - b[1].postPositionNo).map((item) => (

                        <CenterData
                          key={item[0]}
                          id={item[0]}
                          postTopicName={item[1].postTopicName}
                          postTopicName1={item[1].postTopicName1}
                          postTopicName2={item[1].postTopicName2}
                          postTopicName3={item[1].postTopicName3}
                          postImage={item[1].postImage}
                          postImage2={item[1].postImage2}
                          postImage3={item[1].postImage3}
                          postImage4={item[1].postImage4}
                          postImage5={item[1].postImage5}
                          postLongDetail={item[1].postLongDetail}
                          postLongDetail1={item[1].postLongDetail1}
                          postLongDetail2={item[1].postLongDetail2}
                          postLongDetail3={item[1].postLongDetail3}
                          postTimestamp={item[1].postTimestamp}
                          postTime={item[1].postTime}
                          postLocation={item[1].postLocation}
                          postWhatsappLink={item[1].postWhatsappLink}
                          postCallLink={item[1].postCallLink}
                          postEmailLink={item[1].postEmailLink}
                          postMapLink={item[1].postMapLink}
                          onClickhandleDelete={(e) => handleDelete(item[0], e)}
                          onClickhandleEdit={(e) =>
                            handleEdit(
                              item[1].postTopicName,
                              item[1].postTopicName1,
                              item[1].postTopicName2,
                              item[1].postTopicName3,
                              item[1].postImage,
                              item[1].postImage2,
                              item[1].postImage3,
                              item[1].postImage4,
                              item[1].postImage5,
                              item[1].postLongDetail,
                              item[1].postLongDetail1,
                              item[1].postLongDetail2,
                              item[1].postLongDetail3,
                              item[1].postPositionNo,
                              item[1].postIsActiveStatus,
                              item[0],
                              item[1].postTime,
                              item[1].postLocation,
                              item[1].postWhatsappLink,
                              item[1].postCallLink,
                              item[1].postEmailLink,
                              item[1].postMapLink,
                              e
                            )}
                        />
                      )) :
                      <div className="row justify-content-center pt-4">
                        <div className="col-lg-12">
                          <div className="noprogramAdded text-center bg-white border shadow p-5">
                            <h2 className="noTaskAdded">Coming Soon</h2>
                            <span>We'll notify you as soon as something becomes available.</span>
                          </div>
                        </div>
                      </div>}
                  </div>
                )}
              </div>



            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Center