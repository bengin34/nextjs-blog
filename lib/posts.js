import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
* @description This function retrieves all posts data from a directory of Markdown
* files and returns the data sorted by date.
* 
* @returns { object } The `getSortedPostsData()` function returns an array of sorted
* posts data objects sorted by date. Each object contains an `id` property and
* metadata properties like `title`, `author`, `date`, etc.
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
* @description This function retrieves data from the JSONPlaceholder API by fetching
* the "posts" endpoint and returns the response as JSON.
* 
* @returns { Promise } The output of this function is a promise that resolves to an
* array of objects containing the sorted posts data from the JSONplaceholder API.
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
* @description This is a server-side JavaScript function named `getServerSideProps`
* that returns a set of props to be passed to a client-side React component.
* 
* @param { object } context - The `context` parameter is not used within the
* `getServerSideProps` function. It is a function that can be optionally provided
* as a value for the `Context` object passed to `next`. This function gives the
* opportunity for a component to manipulate the context with some information for
* its parent components when fetched.
* 
* @returns { object } The output returned by the `getServerSideProps` function is
* an object that contains a `props` key with an value of an object.
*/
export async function getServerSideProps(context) {
    return {
      props: {
        // props for your component
      },
    };
  }
