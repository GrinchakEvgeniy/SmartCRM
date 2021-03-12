import React, {useEffect, useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertToRaw, ContentState, convertFromRaw} from 'draft-js';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Statute.scss'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import parse from 'html-react-parser';
import {getStatuteFetch, postStatuteFetch, putStatuteFetch} from "../../requests";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';

const Statute = () => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [valueHTML, setValueHTML] = useState('')
    const [statuteId, setStatuteId] = useState('')
    const [showEditStatute, setShowEditStatute] = useState(false)
    const [st, setSt] = useState('')

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        setValueHTML(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    useEffect(() => {
        getStatuteFetch().then(data => {
            let blocksFromHtml = htmlToDraft(data[0].description)
            const {contentBlocks, entityMap} = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setEditorState(EditorState.createWithContent(contentState))
            setStatuteId(data[0].id)
            setSt(data[0].description)
        })
    }, [])

    const updateStatute = (value, id) => {
        // postStatuteFetch(value).then(data => console.log(data))
        putStatuteFetch(value, statuteId).then(data => console.log(data))
        console.log(st)
    }


    return (
        <div className='statute'>
            <div className='statuteContent'>
                {
                    showEditStatute
                        ?
                        <div className='statuteEdit'>
                            <Editor wrapperClassName='editorWrap'
                                    editorClassName='editor'
                                    toolbarClassName='editorToolbar'
                                    editorState={editorState}
                                    onEditorStateChange={onEditorStateChange}/>
                            <div className="statuteEditBtns">
                                <Button variant="contained"
                                        onClick={() => {
                                            setShowEditStatute(!showEditStatute)
                                        }}
                                        color="secondary">
                                    cancel
                                </Button>
                                <Button variant="contained"
                                        onClick={() => {
                                            updateStatute(valueHTML)
                                            setShowEditStatute(!showEditStatute)
                                        }}
                                        color="primary">
                                    save
                                </Button>
                            </div>
                        </div>
                        :
                        <div className='statuteShow'>
                            <div className='editBtn'>
                                <EditIcon onClick={() => {
                                    setShowEditStatute(!showEditStatute)
                                }}/>
                            </div>
                            {parse(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                        </div>
                }
            </div>
        </div>
    );
};

export default Statute;