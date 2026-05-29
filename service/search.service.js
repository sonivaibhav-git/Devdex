// services/search.service.js

const {
   SearchProjectsRepository
} = require(
   "../repositories/project.repo"
);

const {
   SearchProblemsRepository
} = require(
   "../repositories/problem.repo"
);

const GlobalSearchService =
async (query, page, limit) => {

   const skip =
   (page - 1) * limit;

   const projects =
   await SearchProjectsRepository(
      query,
      skip,
      limit
   );

   const problems =
   await SearchProblemsRepository(
      query,
      skip,
      limit
   );

   // FORMAT RESULTS

   const formattedProjects =
   projects.map(project => ({
      type: "project",
      data: project
   }));

   const formattedProblems =
   problems.map(problem => ({
      type: "problem",
      data: problem
   }));

   // COMBINE RESULTS

   const results = [
      ...formattedProjects,
      ...formattedProblems
   ];

   return results;
};

module.exports = {
   GlobalSearchService
};