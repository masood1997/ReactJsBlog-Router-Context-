import axios from 'axios';
import { Link, useLoaderData } from 'react-router-dom';

const Github = () => {
  const data = useLoaderData();
  return (
    <>
      <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
        <h3 className="mb-4">{data.bio}</h3>
        <div className="flex items-center">
          <img src={data.avatar_url} alt="Git picture" width={250} />
          <div className="ml-4">
            <p>
              My Repositories : <Link className="hover:text-lime-500 text-stone-800" to="https://github.com/masood1997">{data.login}</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Github;

export const gitHubLoader = async () => {
  try {
    const response = await axios.get('https://api.github.com/users/masood1997');
    return response.data;
  } catch (error) {
    console.log(`Error occured while fetching github profile ${error.message}`);
  }
};
