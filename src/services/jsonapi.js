
module.exports.createJAR = (type,attributes,id) =>{
    const response = {type, attributes, id}
    return JSON.parse(JSON.stringify(response));
}

module.exports.getPage = (page) =>{
    let ownPage;
    if(page == 0) page = 1
    return (!page)
    ? ownPage = 1
    : ownPage = page
}

module.exports.getOffset = (offset) =>{
    let ownOffset;
    if(offset == 0) offset = 1
    return (!offset)
    ? ownOffset = 10
    : ownOffset = offset
}

function createNextLink (page,division) {
    let nextPage;
    return (page<division.length-1) 
    ? nextpage = parseInt(page) + 1
    : nextPage = division.length -1
    
  }

function createPrevLink (page){
    let prevPage;
    return (page>0) 
    ? prevPage = parseInt(page) - 1
    : prevPage = page 
  }

module.exports.createLinks = (page,offset,division,req) => {
return  {
    self : `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page}&offset=${offset}`, 
    first: `${req.protocol}://${req.get('host')}${req.baseUrl}?page=0&offset=${offset}`,
    last: `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${division.length-1}&offset=${offset}`,
    next: `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${createNextLink(page,division)}&offset=${offset}`,
    prev: `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${createPrevLink(page)}&offset=${offset}`, 
  }
  
}

