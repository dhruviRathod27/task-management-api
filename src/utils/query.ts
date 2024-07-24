export class Query {

    // * Save
    public save = async (Model: any, data: any) => {
      try {
        const res= Model(data).save();
        if(res){
            return Promise.resolve(res);
        }
      } catch (err) {
        console.error('# Query -> save -> catch: ', err);
        return Promise.reject(err);
      }
    };
  
    // * Find/Get
    public find = async (Model: any, filter: any, projection = '', sort = {}) => {
      try {
        console.log('# Query -> find start');
        console.log('filter===>', filter);
        const res=Model.find(filter,projection).sort(sort).lean();
        if(res){
            return Promise.resolve(res);
        }
      } catch (error) {
        console.error('# Query -> find -> catch: ', error);
        return Promise.reject(error);
      }
    }
  
    // * Update one
    public updateOne = async (Model: any, filter: any, updateData:any) => {
      try {
        console.log('# Query -> update start ')
        const res= Model.updateOne(filter,updateData);
        return Promise.resolve(res);
      } catch (error) {
        console.error('# Query -> update -> catch: ', error);
        return Promise.reject(error);
      }
    }
  
    public delete = async (Model: any, filter: any) => {
      try {
        console.log('# Query -> delete start');
        const res= Model.remove(filter);
        return Promise.resolve(res);

      } catch (error) {
        console.log('# Query -> delete -> catch: ', error);
        return Promise.reject(error);
      }
    }
  
    public findWithPaginationAndPopulation = async (Model: any, filter: any, projection:any = '',pagination: any = {} ,sort:any = {},search = '',populate:any) => {
      try {
        console.log('# Query -> findWithPaginationAndPopulation start');
        let query = Model.find(filter,projection)
        const resultData= query.exec();
        return Promise.resolve(resultData);
      } catch (error) {
        console.log('# Query -> findWithPaginationAndPopulation -> catch: ', error);
        return Promise.reject(error)
        ;
      }
    }
  
    public count = async(Model: any, filter: any) => {
      try {
        console.log('# Query -> count start');
        return Promise.resolve(Model.countDocuments(filter));
      } catch (error) {
        console.log('# Query -> count -> catch: ', error);
        return Promise.reject(error);
      }    
    }
  
  }
  