import React, { useRef, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'


function AddBookForm() {
  const { data, loading } = useQuery(getAuthorsQuery);
  const [addBook, { loading: addBookLoading, error }] = useMutation(addBookMutation);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const inputRef = useRef([]);


  const handleFormSubmit = e => {
    e.preventDefault();
    console.log({ name, genre, authorId });
    addBook({ variables: { name, genre, authorId }, refetchQueries: [{ query: getBooksQuery }] }).then(() => {
      setName('');
      setGenre('');
      setAuthorId('');
      inputRef.current.forEach((element, index) => {
        if (index === 2) {
          element.value = 'default'
        } else {
          element.value = ''
        }
      });
    }).catch(err => {
      console.log(JSON.stringify(error, null, 2));
    })
  }

  const renderAuthorList = () => {
    if (loading) {
      return <option disabled>{'Loading Options'}</option>
    }
    return data.authors.map(o => <option key={o.id} value={o.id}>{o.name}</option>)
  }

  return (
    <div className="BookAddContainer">
      <form className="form-horizontal">
        <fieldset>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="bookname">Book Name</label>
            <div className="col-md-4">
              <input ref={(element) => { inputRef.current[0] = element }}
                onChange={e => setName(e.target.value)} id="bookname" name="bookname" type="text" placeholder="Enter Your Book Name" className="form-control input-md" required="" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="bookgenre">Genre</label>
            <div className="col-md-4">
              <input ref={(element) => { inputRef.current[1] = element }} onChange={e => setGenre(e.target.value)} id="bookgenre" name="bookgenre" type="text" placeholder="Enter Genre" className="form-control input-md" required="" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="Author">Select Author</label>
            <div className="col-md-4">
              <select ref={(element) => { inputRef.current[2] = element }} defaultValue="default" onChange={e => setAuthorId(e.target.value)} id="Author" name="Author" className="form-control">
                <option value="default" disabled hidden>Select Author</option>
                {renderAuthorList()}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" style={{
              visibility: 'hidden'
            }} htmlFor="singlebutton">Add Book</label>
            <div className="col-md-4">
              <button onClick={handleFormSubmit} disabled={name === '' || genre === '' || authorId === '' || addBookLoading} id="singlebutton" name="singlebutton" className="btn btn-primary">Add Book</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}


export default AddBookForm;

