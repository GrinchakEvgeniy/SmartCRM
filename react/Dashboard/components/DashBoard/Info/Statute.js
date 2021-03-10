import React, {useEffect, useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertToRaw} from 'draft-js';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Statute.scss'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {getStatuteFetch, postStatuteFetch} from "../../requests";

const Statute = () => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [valueHTML, setValueHTML] = useState('')

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        setValueHTML(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    useEffect(() => {
        getStatuteFetch().then(data=>console.log(data))
    }, [])

    const updateStatute = (value) => {
        postStatuteFetch(value).then(data => console.log(data))
    }


    return (
        <div className='statute'>
            <Editor wrapperClassName='editorWrap'
                    editorClassName='editor'
                    toolbarClassName='editorToolbar'
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
            />
            <button onClick={() => {
                console.log(valueHTML)
                updateStatute(valueHTML)
            }}>test
            </button>
            <textarea
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>
    );
};

export default Statute;