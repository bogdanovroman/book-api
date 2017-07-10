import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';


const apiKey = '&key=AIzaSyDUHHiUGXjJQCXztYIryMV0e-VGAHMv7dQ';
const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    getBooksByTitle = (title) => {
        axios.get(apiUrl + title + apiKey)
            .then(function (response) {
                this.setState({
                    books: response.data.items
                })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange = () => {
        this.getBooksByTitle(this.input.value);
    }


    render() {
        let bookTemplate = _.map(this.state.books, (book, index) => {
            let author = book.volumeInfo.authors && book.volumeInfo.authors.length > 0 ? book.volumeInfo.authors[0] : 'Noname';
            let thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/';
            return (
                <div className="book" key={index}>
                    <div className="uk-card uk-card-default uk-card-body uk-padding-small">
                        <p className="uk-text-truncate">{book.volumeInfo.title}</p>
                        <p className="uk-text-small uk-text-truncate">{author}</p>
                        <div className="">
                            <img src={thumbnail} alt="" className="uk-width-1-1"/>
                        </div>
                    </div>

                </div>
            )
        })
        return (
            <div className="wrapper uk-padding">
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Text</label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            id="form-stacked-text"
                            type="text"
                            ref={input => this.input = input}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div is class="uk-margin uk-child-width-1-6 uk-grid-match" uk-grid>
                    {bookTemplate}
                </div>
            </div>
        );
    }
}
