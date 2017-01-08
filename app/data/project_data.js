const data = [
  {
    title: 'Probabilistic Reasoning',
    type: 'Artificial Intelligence',
    date: 'Fall 2016',
    url: 'gn6JMyW8MsY',
    language: ['java'],
    technologies: [],
    thumbnail: 'hmm',
    description: 'The environment: a maze with colored tiles and no obstacles. ' +
    'The agent: a blind robot that knows the location of the walls and the colors of ' +
    'each tile in the maze. The actions: the agent can guess the color of ' +
    'its current location with a 0.88 probability of getting it right; the ' +
    'agent knows that it moves at most one tile at a time, but has no idea' +
    ' where it is or where it\'s headed. The goal: the agent must try to ' +
    'determine its current location. The solution: via a Hidden Markov Model, ' +
    'filter and smooth probabilty distributions updating the most likely ' +
    'locations for the agent using a forward-backward alogirthm, and finally, ' +
    'compute the most likely sequence of robot locations with the Viterbi ' +
    'algorithm.',
  },
  {
    title: 'Chess Programming',
    type: 'Artificial Intelligence',
    date: 'Fall 2016',
    url: null,
    language: ['java'],
    technologies: [],
    thumbnail: 'chess',
    description: 'Using the Chesspresso library, the algorithm simulates plys ' +
    'from both players up to a certain depth (usually 5 plys) and chooses the ' +
    'move with the highest heursitic score (terminal moves are evaluated ' +
    'independently). The standard version of the program uses iterative deepening ' +
    'minimax search with alpha-beta prunning to provide a good enough strategy, but' +
    ' the improved version also incorporates null move and delta pruning, an' +
    ' opening book, a transposition table, move reordering, and quiescence ' +
    'search to mitigate horizon effects.',
  },
  {
    title: 'Mazeworld',
    type: 'Artificial Intelligence',
    date: 'Fall 2016',
    url: 'JAML7Ny55bs',
    language: ['java'],
    technologies: [],
    thumbnail: 'maze',
    description: 'A robot starts at a random position in different-sized grids, ' +
    'moves one tile at a time, and needs to find an optimal path to some other ' +
    'coordinate in the grid avoiding the walls and all other obstacles. The ' +
    'algorithm uses A* search equipped with a Fibonacci heap in order to guarantee ' +
    'an optimal solution (if there is one).',
  },
  {
    title: 'Tiny Search Engine',
    type: 'Software Design and Implementation',
    date: 'Summer 2016',
    url: '0HIGeG69oEE',
    language: ['c'],
    technologies: [],
    thumbnail: 'tse',
    description: 'For the sake of modularity, the search engine consists of three ' +
    'components. First, the \'crawler\' takes a root URL and follows hrefs in the ' +
    'HTML code up to a specified depth. Second, the \'indexer\' organizes the data ' +
    'gathered by the crawler using a hashtable with counters to keep track of word ' +
    'occurences that will later be accessed by the last part of the search engine. This final and third part consists of a \'query engine\' that parses queries, verifies ' +
    'syntax, and outputs and ranks results prioritizing relevance. The Tiny Search ' +
    'Engine curently exists only as a C program to be run via command prompt, but ' +
    'it could easily be implemented as an efficient web service.',
  },
  {
    title: 'Post-It App',
    type: 'Full-Stack Web Development',
    date: 'Summer 2016',
    url: 'http://mauesrog-notes.surge.sh/',
    language: ['javascript'],
    technologies: ['nodejs', 'react', 'firebase', 'babel', 'sass', 'eslint', 'facebook_auth'],
    thumbnail: 'postit',
    description: 'Once users authenticate their access with their Facebook credentials, they obtain a set of post-it ' +
    'note boards that implement a CRUD database: users can create notes, read ' +
    'notes once they have been stored in the Firebase database, update their ' +
    'title and content with text or GIF images, and delete them with ease. ' +
    'Furthermore, users can rearrange notes by draggin them or simply toggling the ' +
    'grid layout, and if anything goes wrong, the app keeps track of all changes to ' +
    'allow user to undo any kind of actions.',
  },
];

export default data;
