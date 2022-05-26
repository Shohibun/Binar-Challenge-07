/* eslint-disable react/style-prop-object */
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Axios from "axios";
import { Link } from "react-router-dom";
import img from "../images/Infinity-1s-200px.svg";
import { useDropzone } from "react-dropzone";

export default function AddNewCar() {
  const [dataMobilAdmin, setDataMobilAdmin] = useState({
    name: "", 
    category: "", 
    price: "",
    status: "", 
    image: ""
  });
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptFile) => {
    console.log(acceptFile);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    // accept: 'text/csv',
    accept: [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "video/mp4",
      "video/mpeg",
    ],
  });

  const postData = async (element) => {
    setLoading(true);

    element.preventDefault();
    const post = await Axios.post(
      "https://rent-cars-api.herokuapp.com/admin/car", {
        name: dataMobilAdmin.name, 
        category: dataMobilAdmin.category, 
        price: dataMobilAdmin.price, 
        status: dataMobilAdmin.status, 
        image: dataMobilAdmin.image
      }
    ).catch((err) => {
      console.log(err);
    });
    setDataMobilAdmin(post.dataMobilAdmin);
    setLoading(false);
  };

  const handle = (element) => {
    const newData = {...dataMobilAdmin};
    newData[element.target.id] = element.target.value;
    setDataMobilAdmin(newData);
    console.log(newData)
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <p className="text-dark custom-font-1">
            <span className="font-weight-bold text-dark">
              Cars &gt; List Car &gt;{" "}
            </span>
            Add New Car
          </p>
        </div>
      </div>

      <h6 className="font-weight-bold custom-font-2 mb-4">Add New Car</h6>

      {loading === true ? (
        <>
          <div className="text-center">
            <img src={img} alt="" srcset="" />
            Loading
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-md-12 bg-white pt-4 pb-3">
              <Form onSubmit={(element) => postData(element)}>
                <div className="form-group row">
                  <label
                    htmlFor="name"
                    className="col-sm-2 col-form-label custom-font-1"
                  >
                    Name<span className="custom-red">*</span>
                  </label>
                  <div className="col-sm-10">
                    <Input
                    onChange={(element) => {handle(element)} }
                      type="text"
                      className="form-control custom-font-1 w-25"
                      id="name"
                      value={dataMobilAdmin.name}
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="category"
                    className="col-sm-2 col-form-label custom-font-1"
                  >
                    Category<span className="custom-red">*</span>
                  </label>
                  <div className="col-sm-10">
                    <Input
                    onChange={(element) => {handle(element)} }
                      type="text"
                      className="form-control custom-font-1 w-25"
                      id="category"
                      value={dataMobilAdmin.category}
                      placeholder="Category"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="price"
                    className="col-sm-2 col-form-label custom-font-1"
                  >
                    Price<span className="custom-red">*</span>
                  </label>
                  <div className="col-sm-10">
                    <Input
                    onChange={(element) => {handle(element)} }
                      type="text"
                      className="form-control custom-font-1 w-25"
                      id="price"
                      value={dataMobilAdmin.price}
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="status"
                    className="col-sm-2 col-form-label custom-font-1"
                  >
                    Status<span className="custom-red">*</span>
                  </label>
                  <div className="col-sm-10">
                    <div className="row">
                      <div className="col-md-1">
                        <Input
                        onChange={(element) => {handle(element)} }
                          type="radio"
                          className="form-control custom-font-1 w-50"
                          id="true"
                          value={dataMobilAdmin.status}
                        />
                      </div>
                      <div className="col-md-11">
                        <label htmlFor="true" className="custom-font-1">
                          True
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-1">
                        <Input
                        onChange={(element) => {handle(element)} }
                          type="radio"
                          className="form-control custom-font-1 w-50"
                          id="false"
                          value={dataMobilAdmin.status}
                        />
                      </div>
                      <div className="col-md-11">
                        <label htmlFor="false" className="custom-font-1">
                          False
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="image"
                    className="col-sm-2 col-form-label custom-font-1"
                  >
                    Photo<span className="custom-red">*</span>
                  </label>
                  <div className="col-sm-10">
                    <div className="w-25 border pt-2 pr-2 d-inline-flex justify-content-between rounded"  {...getRootProps({
                        className: `dropzone
                        ${isDragAccept && "dropzoneAccept"}
                        ${isDragReject && "dropzoneReject"}`,
                      })}>
                      {isDragActive ? (
                        <span className="name custom-font-1 text-muted ml-2">
                        Drop the file here...
                      </span>
                      ) : (
                        <span className="name custom-font-1 text-muted ml-2">Drag and drop some file here</span>
                      )}
                      &nbsp;
                      <FontAwesomeIcon
                        icon={faArrowUpFromBracket}
                        id="files"
                        className="custom-fa text-muted custom-size-aweseome-1"
                      />
                      <Input {...getInputProps()} type="file" id="image" value={dataMobilAdmin.image} />
                    </div>
                    <small
                      id="image"
                      className="form-text text-muted custom-font"
                    >
                      File size max. 2MB
                    </small>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputStart"
                    className="col-sm-2 col-form-label custom-font-1"
                  >
                    Start Rent
                  </label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      readonly
                      className="form-control-plaintext custom-font-1"
                      id="inputStart"
                      value="-"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputFinsih"
                    className="col-sm-2 col-form-label custom-font-1"
                  >
                    Finish Rent
                  </label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      readonly
                      className="form-control-plaintext custom-font-1"
                      id="inputFinish"
                      value="-"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputCreated"
                    className="col-sm-2 col-form-label custom-font-1"
                  >
                    Created at
                  </label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      readonly
                      className="form-control-plaintext custom-font-1"
                      id="inputCreated"
                      value="-"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputUpdated"
                    className="col-sm-2 col-form-label custom-font-1"
                  >
                    Updated at
                  </label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      readonly
                      className="form-control-plaintext custom-font-1"
                      id="inputUpdated"
                      value="-"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-start mt-5 pt-5">
                  <button className="btn btn-outline-primary mr-2 custom-font-4">
                    Cancel
                  </button>
                  <Link
                    className="btn btn-primary custom-font-4"
                    to="/list-car-admin"
                  >
                    Save
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
