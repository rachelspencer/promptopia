"use client"

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search States
  const [ searchText, setSearchText ]= useState("");
  const [ searchTimeout, setSearchTimeout ] = useState(null);
  const [ searchResults, setSearchResults ] = useState([]);
 

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // return posts filered by search term
  const filteredPrompts = (searchText) => allPosts.filter((post) => {
    const { creator, prompt, tag } = post;
    const { username } = creator;
    const searchTextLowerCase = searchText.toLowerCase()

    if (username.toLowerCase() === searchTextLowerCase || prompt.toLowerCase().includes(searchTextLowerCase) || tag.toLowerCase().includes(searchTextLowerCase)){
      return true;
    }
    return false;
  });

  //handle search
  const handleSearchChange = (e) => {
    // first clear any existing time by passing it the searcTimeout state initializer
    clearTimeout(searchTimeout)
    //grab the value of the search text
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPrompts(e.target.value)
        console.log('rezzz', searchResult)
        setSearchResults(searchResult);
      }, 500)
    )
  }

  //hangle tag click
  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    
    const searchTagResults = filteredPrompts(tagName)
    setSearchResults(searchTagResults)
  };
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or usernames"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      
      <PromptCardList
        data={!searchText ? allPosts : searchResults}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;