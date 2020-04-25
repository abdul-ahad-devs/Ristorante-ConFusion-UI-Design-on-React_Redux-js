import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { basedUrl } from '../shared/basedUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => (!val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len)

    function RenderComments({comments, postComment, dishId}) {
       if (comments != null) {
            return (
               <div className="col-12 col-md-5 m-1">
                   <h4>Comments</h4>
                   <ul className="list-unstyled">
                         <Stagger in>
                            {comments.map((comment) => {
                                return (
                                    <Fade in>
                                    <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                   </ul>
                   <CommentForm dishId={dishId} postComment={postComment} />
               </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    function RenderDish({dish}) {
       if (dish != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card>
                            <CardImg top src={basedUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                </FadeTransform>
                </div>
 
             );
        }  
        else
            return(
                <div></div>
            );
    }   

class CommentForm extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isModalOpen: false
            };
    
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        toggleModal = () => {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
    
        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

        }
    
        render() {
            return(
                <div>
                    <Button outline type="submit" value="submit"
                            className="fa fa-pencil fa-lg"
                            onClick={this.toggleModal}>
                        {' '} Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Your Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) =>this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor="rating"><h6>Rating</h6> </Label>
                                            <Control.select model=".rating" id="rating" name="rating"
                                                className="form-control">
                                                <option>1</option>    
                                                <option>2</option>  
                                                <option>3</option>  
                                                <option>4</option>  
                                                <option>5</option>  
                                            </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group" md={12}>
                                    <Label htmlFor="author" md={12}><h6>Your Name</h6></Label>
                                    <Col>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                 minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"  
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group" >
                                    <Label htmlFor="comment" md={12}><h6>Comment</h6></Label>
                                    <Col>
                                        <Control.textarea model=".comment" id="comment" 
                                            name="comment" rows="6"  md={12} className="form-control">
                                        </Control.textarea>    
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
}

    const DishDetail = (props) =>  {
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}  
                            postComment={props.postComment} 
                            dishId={props.dish.id} 
                        />
                    </div>
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }


export default DishDetail