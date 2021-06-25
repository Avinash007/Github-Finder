import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);

  const alertContext = useContext(AlertContext);

  // text is the State variable, setText is function to change it and '' is default value
  const [text, setText] = useState("");

  // Since the state(text) is originally an "", you cannot write anything on search
  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      // Show an alert if Search is empty
      alertContext.setAlert("Please Enter Something", "light");
    } else {
      githubContext.searchUsers(text); // to search in App.js
      setText(""); // Clear the text after Submit
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
