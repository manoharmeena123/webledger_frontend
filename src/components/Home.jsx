import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/home.css'; 

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState('ascending');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query') || '';
    const maxFat = params.get('maxFat') || 60;

    // Retrieve the token from local storage
    const token = localStorage.getItem('authToken');

    fetchRecipes(searchQuery, maxFat, token);
  }, [location.search]);

  const fetchRecipes = async (searchQuery, maxFat, token) => {
    try {
      const response = await axios.get(`http://localhost:8000/search/api/recipes`, {
        params: {
          query: searchQuery,
          maxFat: maxFat
        },
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Function to sort recipes based on nutrient amount
  const sortRecipes = (order) => {
    const sortedRecipes = [...recipes].sort((recipeA, recipeB) => {
      const nutrientA = recipeA.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat');
      const nutrientB = recipeB.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat');
      if (nutrientA && nutrientB) {
        return order === 'ascending' ? nutrientA.amount - nutrientB.amount : nutrientB.amount - nutrientA.amount;
      }
      return 0;
    });

    setRecipes(sortedRecipes);
    setSortOrder(order);
  };

  return (
    <div className="container">
     
      <div className="row mt-3">
        <div className="col-sm-3">
          <select className="form-control" onChange={(e) => sortRecipes(e.target.value)}>
            <option value="">Sorting</option>
            <option value="ascending">Sort by Ascending</option>
            <option value="descending">Sort by Descending</option>
          </select>
        </div>
      </div>
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-sm-6 col-md-4 col-lg-4 mt-3 mb-3" key={recipe.id}>
            <div className="recipe-card">
              <img className="recipe-image" src={recipe.image} alt={recipe.title} />
              <div className="card-content">
                <h3 className="recipe-title">{recipe.title}</h3>
                <div className="nutrition">
                  {/* <h4>Nutrition:</h4> */}
                  <ul>
                    {recipe.nutrition.nutrients.map(nutrient => (
                      <li key={nutrient.name}>
                        <h5 className="nutrient-name">Name: {nutrient.name}</h5>
                        <h5 className="nutrient-amount">Amount: {nutrient.amount}</h5>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
