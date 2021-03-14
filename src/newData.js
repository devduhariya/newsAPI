import React, { Component } from 'react'
import axios from 'axios';
export default class newData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            page: 1,
            errorMessage: ''
        }
        this.gettingdata = this.gettingdata.bind(this);
    }

    gettingdata(pageNum) {
        axios.get('https://newsapi.org/v2/everything?q=Apple&from=2021-03-13&sortBy=popularity&page=' + pageNum + '&apiKey=2dd4d98d57e24bc1a97746480b389a83').then((res) => {
            console.log("res", (res))
            this.setState({
                news: [...this.state.news, ...res.data.articles]
            });
        }).catch(error => {
            console.error('error: ', error);
            this.setState({
                errorMessage: "You have requested too many results. Developer accounts are limited to a max of 100 results. You are trying to request results 120 to 140. Please upgrade to a paid plan if you need more results."
            })
        });
    }
    componentDidMount() {
        window.addEventListener('scroll', this.infiniteScroll);
        // this.fetchData(this.state.page);
        this.gettingdata(this.state.page);
    }

    infiniteScroll = () => {
        // End of the document reached?
        if (window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight) {

            let newPage = this.state.page;
            newPage++;
            this.setState({
                page: newPage
            });
            this.gettingdata(newPage);
        }
    }

    render() {
        console.log('this.state.getNews: ', this.state.news);
        return (
            <div className="container">
                <h2 className="text-center mb-5">Breaking news</h2>
                {this.state.news && this.state.news.length > 0 ?
                    this.state.news.map((data, index) => {
                        return (
                            <div className="row my-2" key={index}>
                                <div className="col-sm-4">
                                    <img className="img-fluid max-width: 100%" src={data.urlToImage} alt={data.source.name} />
                                </div>
                                <div className="col-sm-8">
                                    <h3>{data.title}</h3>
                                    <a href={data.url} rel="noreferrer" target="_blank" >India.com News Desk</a> | <span>{data.publishedAt}</span>
                                    <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
                                </div>
                                <div className="col-sm-12 my-1">
                                    <hr />
                                </div>
                            </div>
                        );
                    })
                    : <div>Loading Please Wait ...</div>}

                {this.state.errorMessage !=='' ? <div className="alert alert-danger" role="alert">
                    {this.state.errorMessage} 
                </div>:''}
            </div>
        )
    }
}
