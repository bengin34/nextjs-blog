import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
* @description This function gets all the file names under a directory called
* "postsDirectory" and uses gray-matter to parse the markdown files as JSON data.
* 
* @returns { object } The `getSortedPostsData()` function returns an array of sorted
* posts data from a list of files under a /posts directory. The output is an array
* of objects where each object contains an 'id' and metadata from the Gray Matter
* parsed markdown file for that post.
*/
export function getSortedPostsData() {
    
        // Get file names under /posts
        const fileNames = fs.readdirSync(postsDirectory);
    
        const allPostsData = fileNames.map(fileName => {
    
            // Remove ".md" from file name to get id
            const id = fileName.replace(/\.md$/, '');
    
            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
    
            const fileContents = fs.readFileSync(fullPath, 'utf8');
    
            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);
    
            // Combine the data with the id
            return {
                id,
                ...matterResult.data
            };
    
        });
    
        // Sort posts by date
        return allPostsData.sort((a, b) => {
            if (a.date < b.date) {
                return 1;
    
            } else {
                return -1;
            }
        });
    }

/**
* @description This function fetches data from the JSONPlaceholder API at the URL
* `https://jsonplaceholder.typicode.com/posts`, and returns the JSON response as an
* array of objects.
* 
* @returns { object } The output returned by the function `getApiSortedPostsData()`
* is a promise of an array of objects representing the sorted posts data from the
* API. The function uses the `fetch` method to retrieve the data from the API and
* then returns the response as a JSON object.
*/
    export  async function getApiSortedPostsData(){
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        return res.json();
    }


//     import someDatabaseSDK from 'someDatabaseSDK'

// const databaseClient = someDatabaseSDK.createClient()

// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from a database
//   return databaseClient.query('SELECT posts...')
// }

/**
* @description This function is called `getServerSideProps` and it is an asynchronous
* function that returns data as props for a React component. It takes a single
* argument `context` and returns an object with two properties: `props` and `params`.
* 
* @param { object } context - The `context` input parameter is an object that contains
* information about the current API request and provides a way for the server to
* access the Request and Response objects.
* 
* @returns { object } The output returned by this function is an object that contains
* `props` property with values for your component.
*/
export async function getServerSideProps(context) {
    return {
      props: {
        // props for your component
      },
    };
  }
