import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
* @description This function gets all the file names under a specified directory
* (postsDirectory), reads each file's contents as markdown text using gray-matter
* parser to extract metadata like date and title and returns the sorted list of all
* posts data including the id (filename minus .md extension) along with post metadata.
* 
* @returns { object } The `getSortedPostsData()` function takes an array of file
* names under a directory (`postsDirectory`) and returns a sorted array of objects
* representing the posts with properties like `id` and metadata from each post's
* YAML front matter.
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
* @description The function `getApiSortedPostsData` fetches data from the URL
* <https://jsonplaceholder.typicode.com/posts> using `fetch`, and returns the response
* data as a JSON object once the request is complete.
* 
* @returns { object } The function `getApiSortedPostsData()` is an asynchronous
* function that makes a GET request to the JSON placeholder API for posts.
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
* @description This is a server-side rendering function written using React Suspense.
* 
* @param { object } context - The `context` input parameter is an object that provides
* information about the current server-side rendering request and its context.
* 
* @returns { object } The function `getServerSideProps` returns an object with a
* `props` property that contains the props for the component.
*/
export async function getServerSideProps(context) {
    return {
      props: {
        // props for your component
      },
    };
  }
