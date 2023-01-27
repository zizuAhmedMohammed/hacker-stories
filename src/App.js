import React from 'react';

const useSemiPersistentState = () => {
  const [value, setValue] = React.useState(
    localStorage.getItem('value') || ''
  );

  React.useEffect(() => {
    localStorage.setItem('value', value);
  }, [value]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search'
  );

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    console.log(searchTerm)
  };

  const searchedStories = stories.filter( story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    <h1>My Hacker Stories</h1>

    <Search search={searchTerm} onSearch={handleSearch} />
    {/* <p>Search Keyword: <strong>{searchTerm}</strong></p> */}

    <hr />
    
    <List list={searchedStories}/>
  </div>
  );
};

const Search = ({ search, onSearch }) => (   
  <div>
    <label htmlFor='search'>Search: </label>
    <input id='search' type='text' value= {search} onChange={onSearch}/>
  </div>
  );
 
const List = ({list}) =>
  list.map(item => (
    <div key={item.objectID}>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  ));

export default App;