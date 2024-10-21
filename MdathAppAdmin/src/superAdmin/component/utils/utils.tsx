
const HTMLStringToDOM = ({ htmlString }:{htmlString:string}) => {

const createMarkup = (html:string) =>{

    const parser = new DOMParser()
    const doc = parser.parseFromString(html,'text/html') 
    return { __html: doc.body.innerHTML };
}

  return <div dangerouslySetInnerHTML={createMarkup(htmlString)} />;
};

export default HTMLStringToDOM;