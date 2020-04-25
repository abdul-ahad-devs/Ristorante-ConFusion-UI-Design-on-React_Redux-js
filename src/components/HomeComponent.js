import React from 'react';
import { Card, CardBody, CardText, CardImg, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading} from './LoadingComponent';
import { basedUrl } from '../shared/basedUrl';
import { FadeTransform } from 'react-animation-components';


function RenderCard({item, isLoading, errMess}) {
    
    if (isLoading) {
        return(
            <Loading />
        );
    }
    else if (errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }
    else 
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={basedUrl + item.image} alt={item.name} />
                    <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );

}

const Home = (props) => {
    
    return(
        <div className="container"> 
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">     
                    <RenderCard item={props.dish} 
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess}
                    />
                </div>
                <div className="col-12 col-md m-1">     
                <   RenderCard item={props.promotion} isLoading={props.promoLoading}
                         errMess={props.promoErrMess} />
                    
                </div>
                <div className="col-12 col-md m-1">     
                    <RenderCard item={props.leader} isLoading={props.LeaderLoading}
                         errMess={props.LeaderErrMess}  />
                </div>
            </div>
        </div>
    );
}

export default Home;