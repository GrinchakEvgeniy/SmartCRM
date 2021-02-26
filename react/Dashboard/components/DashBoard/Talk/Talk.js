import React from 'react';
import {TextField} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import './Talk.scss'

const Talk = () => {
    return (
        <div className="talk">
            <div className="tweets">
                <div className="tweetsWrap">
                    <div className="message">
                        <h4 className="authorName">Name author</h4>
                        <p>Bla-bla-bla</p>
                    </div>
                    <div className="message my">
                        <h4 className="authorName">Name author</h4>
                        <p>Bla-bla-bla</p>
                    </div>
                    <div className="message">
                        <h4 className="authorName">Name author</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam architecto aut
                            consectetur delectus deleniti distinctio dolorem ea esse ex exercitationem facilis fugiat
                            illo illum incidunt ipsam itaque magni minus molestias natus nisi odio officia officiis
                            omnis optio possimus quas repellat repellendus soluta ullam ut, veritatis voluptas
                            voluptates? Aspernatur corporis deleniti deserunt dolorem esse laborum maxime, mollitia
                            necessitatibus neque, officiis, optio porro repellat tenetur velit voluptatibus? A beatae
                            dolorem libero modi mollitia, officia omnis perspiciatis quasi voluptatem! Asperiores magni
                            nam nemo, numquam officiis perferendis quaerat quidem voluptatum? Consequatur, corporis
                            dignissimos distinctio harum necessitatibus obcaecati quod sed ut velit veritatis.
                            Blanditiis?</p>
                    </div>
                    <div className="message my">
                        <h4 className="authorName">Name author</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cum debitis deserunt
                            dignissimos ea explicabo harum iste, magnam odit rerum!</p>
                    </div>
                </div>
            </div>
            <div className="createTweet">
                <TextField className='inputField'
                           id="outlined-multiline-static"
                           label="Message"
                           fullWidth
                           multiline
                           rows={5}
                           rowsMax={5}
                           defaultValue=""
                           variant="outlined"
                />
                <div className="sendIcon">
                    <div className='sendIconWrap'>
                        <SendIcon className='icon'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Talk;