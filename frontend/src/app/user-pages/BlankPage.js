import React, { Component } from 'react'
import {Form} from 'react-bootstrap'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable  from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator"
import * as ReactBootStrap from "react-bootstrap"

export class BlankPage extends Component {
         constructor(props) {
           super(props);

           this.state = {
             url: "",
             limit: "",
             posts: [],
             
            
           };
         }

         changeHandler = e => {
           this.setState({ [e.target.name]: e.target.value });
         };

         submitHandler = e => {
           e.preventDefault();
           console.log(this.state);
           axios
             .post("/predict", this.state)
             .then(response => {
               this.setState({ posts: response.data });
             })
             .catch(error => {
               console.log(error);
             });
         };

         renderTableData() {
           return (
             <table id="posts" className="table">
               <thead>
                 <tr>
                   <th>Comments</th>
                   <th>Sentiment Score</th>
                 </tr>
               </thead>
               <tbody>
                 {this.state.posts.map((post, index) => {
                   const { comment, sentiment } = post; //destructuring
                   return (
                     <tr key={comment}>
                       <td>{comment}</td>
                       <td>{sentiment}</td>
                     </tr>
                   );
                 })}
               </tbody>
             </table>
           );
         }

         render() {
           const { url, limit } = this.state;
           const { posts } = this.state;
           const columns =[
             { dataField : "comment", text: "Comments"},
             { dataField:"sentiment" , text:"Sentiment Score"}
           ]
            
           return (
             <div className="card">
               <div className="card-body">
                 <h4 className="card-title">
                   YouTube Comment Sentiment Analysis
                 </h4>
                 <form className="forms-sample" onSubmit={this.submitHandler}>
                   <Form.Group className="row">
                     <label
                       htmlFor="exampleInputUsername2"
                       className="col-sm-3 col-form-label"
                     >
                       Video ID
                     </label>
                     <div className="col-sm-9">
                       <Form.Control
                         type="text"
                         className="form-control"
                         id="exampleInputUsername2"
                         placeholder="Video Id"
                         name="url"
                         value={url}
                         onChange={this.changeHandler}
                       />
                     </div>
                   </Form.Group>
                   <Form.Group className="row">
                     <label
                       htmlFor="exampleInputEmail2"
                       className="col-sm-3 col-form-label"
                     >
                       Number of Comments
                     </label>
                     <div className="col-sm-9">
                       <Form.Control
                         type="text"
                         className="form-control"
                         id="exampleInputEmail2"
                         placeholder="Number of Comments"
                         name="limit"
                         value={limit}
                         onChange={this.changeHandler}
                       />
                     </div>
                   </Form.Group>

                   <button type="reset" className="btn btn-secondary mr-2">
                     Reset
                   </button>
                   <button
                     type="submit"
                     className="btn btn-primary mr-2"
                     onClick=""
                   >
                     Submit
                   </button>
                 </form>
=

                 {this.renderTableData()}
               </div>
             </div>
           );
         }
       }

export default BlankPage
