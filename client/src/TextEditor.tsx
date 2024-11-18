import { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import { useParams } from 'react-router-dom';

function TextEditor() {
    const {id:documentId } = useParams();    
    const [quill, setQuill] = useState<Quill | undefined>(undefined);


    // Sync changes
    useEffect(() => {
        
       const handler = (delta: any, oldDelta: any, source: string) => {
        if ( source !== 'user') return 
        console.log("Delta is ", delta);
        // socket.emit("send-changes", delta);
       }
       quill?.on("text-change",handler) 

       return () => {
        quill?.off('text-change', handler);
       }
    },[quill])

    // Load document
    useEffect(() => {
        quill?.setContents([{insert:''}]);
        quill?.enable();  
    },[quill,documentId])

    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{align:[]}],
          [{list:'ordered'},{list:'bullet'}],
          [{indent:'+1'},{indent:'-1'}],
          // [{size:['small', false, 'large', 'huge']}],
          [{header:[1,2,3,4,5,6,false]}],
          ['link'], //  'image','video'
          [{color:[]},{background:[]}],
          ['clean']      
      ]}
  
    const wrapperRef = useCallback((wrapper:any) => {
        const editor = document.createElement('div');
        if(wrapper == null) return 
        wrapper.innerHTML = "";
        wrapper.append(editor);
        const q = new Quill(editor,{theme:'snow',modules:modules});
        q.disable();
        q.setText("Loading...");
        setQuill(q);
    },[])
  return (
    <div id="editor" ref={wrapperRef}></div>
  )
}

export default TextEditor