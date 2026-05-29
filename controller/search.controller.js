const {GlobalSearchService} = require("../service/search.service");

const GlobalSearch =async (req, res) => {

   try {
      const {q,page,limit} = req.query;

      const results =
      await GlobalSearchService(q,page,limit);

      return res.status(200).json({results});

   } catch (err) {

      return res.status(500).json({
         message:
         "Internal Server Error"
      });
   }
};

module.exports = {
   GlobalSearch
};