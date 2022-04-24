import React from "react";
import { IoMdSearch } from "react-icons/io";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { BOARD_DATA, USER_DATA } from "./tempData";
import TextField from '@mui/material/TextField';


const { BoardContainer, Column, Search, SearchContent, SearchIcon, Divider, ContentContainer, Title, ContentSubContainer, PhotoArea, WrittenBy, WrittenByLabel,
    State, UnState, Date, Content, ReplyBtn, Blank, BottomBoardContainer, WrittenByBottom, TitleBottom, DateBottom, StateBottom, UnStateBottom, WriteContainer,
    WriteSubContainer, ColumnTitle, SubmitBtn, CancelBtn } = require('./styles')


export const BoardDetail = (props) => {

    const [isReply, setReplyState] = React.useState(false)
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    let button;
    const handleTitle = (event) => { setTitle(event.target.value); };
    const handleContent = (event) => { setContent(event.target.value); };

    if (title == '' || content == '') { button = <CancelBtn onClick={({ target }) => setReplyState(!isReply)}>Cancel</CancelBtn> }
    else { button = <SubmitBtn>Submit</SubmitBtn> }


    return(
        <BoardContainer>
            <Column>
                <Search>
                    <SearchIcon><IoMdSearch style={{color: '#718096', fontSize: '20px'}}/></SearchIcon>
                    <SearchContent />
                </Search>
            </Column>
            <Divider />
            {BOARD_DATA.map((data, i) => (
                <ContentContainer>
                    <ContentSubContainer>
                        <Title>Q: {data.title}</Title>
                        <Column>
                            <PhotoArea img={data.img}/>
                            <ContentSubContainer>
                                <WrittenByLabel>Written By</WrittenByLabel>
                                <WrittenBy>{data.writer}</WrittenBy>
                            </ContentSubContainer>
                        </Column>
                        <Column>
                            { data.state && <State>Answered</State>}
                            { !data.state && <UnState>Not Answered</UnState>}
                            <Date>{data.date}</Date>
                        </Column>
                    </ContentSubContainer>
                    <Divider />

                    <ContentSubContainer>
                        <Content>{data.content}</Content>
                    </ContentSubContainer>
                    
                    <Divider />
                    {props.isDoctor && 
                        <ContentSubContainer>
                            <Blank />
                            <Column>
                                <PhotoArea img={USER_DATA.img}/>
                                {!isReply && 
                                    <ReplyBtn onClick={({ target }) => setReplyState(!isReply)}>
                                        Reply</ReplyBtn>}
                                {isReply && 
                                    <WriteContainer>
                                        <ColumnTitle>
                                            <TextField
                                            fullWidth
                                            variant="standard"
                                            placeholder="Title"
                                            value={title}
                                            onChange={handleTitle}
                                            />
                                        </ColumnTitle>
                                        <Divider />
                                        <WriteSubContainer>
                                            <TextField
                                            rows={18}
                                            multiline
                                            fullWidth
                                            variant="standard"
                                            placeholder="Write Contents..."
                                            value={content}
                                            onChange={handleContent}
                                            />
                                        </WriteSubContainer>
                                        <Divider />
                                        {button}
                                    </WriteContainer>}
                            </Column>
                            <Blank />
                        </ContentSubContainer>
                    }
                </ContentContainer>
            ))}

            <Divider />
        </BoardContainer>
    );
}