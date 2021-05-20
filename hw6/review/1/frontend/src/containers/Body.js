import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';
import { createCard  } from '../api.js'
const Option = Select.Option;
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');
  const [multiQueryType, setMultiQueryType] = useState('and');
  const [operator, setOperator] = useState('=')
  const [nameQueryString, setNameQueryString] = useState('');
  const [subjectQueryString, setSubjectQueryString] = useState('');
  const [scoreQueryString, setScoreQueryString] = useState('');
  const [pageOptions, setPageOptions] = useState([]);
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(0);
  const [dataId, setDataId] = useState(1);
  const [isDataQuery, setIsDataQuery] = useState(false);
  const [dataQuery, setDataQuery] = useState("");

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
      const {
        data: { msg, card },
      } = await axios.post('/api/create-card', {
        name,
        subject,
        score,
    });
    console.log(msg)
    setPage(0)
    setIsDataQuery(false)
    if (!card) addErrorMessage(msg);
    else addCardMessage(msg);
  };

  const handleQuery = async () => {
    const {
      data: { cards, message },
    } = await axios.get('/api/makeQuery', {
      params: {
        queryType,
        queryString
      }
    })// TODO: axios.xxx call the right api
    //console.log(messages)
    //console.log(messages[0].name)
    setIsDataQuery(false)
    var messages = []
    if(cards !== undefined){
      setCards(cards)
      for(var i = 0; i < cards.length; i++){
        messages.push("Retrieving ("+cards[i].name+","+cards[i].subject+","+cards[i].score+")")
      }
      setPageOptions(handlePageOptions(messages))
      setPage(0)
      addRegularMessage(...messages);
    }
    else{
      addErrorMessage(message);
    }
  };
  const handleSort = (attribute) => {
    // sortedMsg = Object.messages(attribute).sort(function(a,b){return [a]-list[b]})
    console.log(attribute)
    var newCards = cards
    setPage(0)
    if(attribute === "score"){
      newCards.sort(function(a, b){
        return b[attribute]-a[attribute]
      })
    }
    else{
      newCards.sort(function(a, b){
        if (a[attribute] < b[attribute])
            return -1 
        if (a[attribute] > b[attribute])
            return 1
        return 0
      })
    }
    console.log(newCards)
    var messages = []
    if(newCards !== undefined){
      for(var i = 0; i < newCards.length; i++){
        messages.push("Retrieving ("+newCards[i].name+","+newCards[i].subject+","+newCards[i].score+")")
      }
      addRegularMessage(...messages);
    }
  };
  const handlePageChange = (num) => {
    var pageNum = Math.ceil(messages.length / 5)
    if(!(num === 1 && page === pageNum - 1) && !(num === -1 && page === 0)){
      setPage(page + num)
    }
  };
  const handleMultiQuery = async () => {
    const {
      data: { cards, message },
    } = await axios.get('/api/makeMultiQuery', {
      params: {
        multiQueryType,
        nameQueryString,
        subjectQueryString,
        scoreQueryString,
        operator
      }
    })// TODO: axios.xxx call the right api
    //console.log(messages)
    //console.log(messages[0].name)
    setIsDataQuery(false)
    var messages = []
    if(cards !== undefined){
      setCards(cards)
      for(var i = 0; i < cards.length; i++){
        messages.push("Retrieving ("+cards[i].name+","+cards[i].subject+","+cards[i].score+")")
      }
      setPageOptions(handlePageOptions(messages))
      setPage(0)
      addRegularMessage(...messages);
    }
    else{
      addErrorMessage(message);
    }
  };
  
  const handlePageOptions = (msg) => {
    var options = []
    for(var i = 0; i < msg.length; i ++){
      options.push(<MenuItem value={i+1}>{i+1}</MenuItem>)
    }
    return options
  }
  
  const handleDataQuery = async (event) => {
    var dataId = event.target.value
    setDataId(dataId)
    setIsDataQuery(true)
    //console.log(messages[dataId-1].message)
    setDataQuery(messages[dataId-1].message)
  }
  const CheckboxGroup = Checkbox.Group;
  return (
    <Wrapper>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
            <FormControlLabel
              value="name"
              control={<Radio color="primary" />}
              label="Name"
            />
            <FormControlLabel
              value="subject"
              control={<Radio color="primary" />}
              label="Subject"
            />
            <FormControlLabel
              value="score"
              control={<Radio color="primary" />}
              label="Score"
            />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Query string..."
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <Row>
      <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={multiQueryType}
              onChange={handleChange(setMultiQueryType)}
            >
            <FormControlLabel
              value="and"
              control={<Radio color="primary" />}
              label="AND"
            />
            <FormControlLabel
              value="or"
              control={<Radio color="primary" />}
              label="OR"
            />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Query by name..."
          value={nameQueryString}
          className={classes.input}
          onChange={handleChange(setNameQueryString)}
        />
        <TextField
          placeholder="Query by subject..."
          value={subjectQueryString}
          className={classes.input}
          onChange={handleChange(setSubjectQueryString)}
          style={{ flex: 1 }}
        />
      </Row>
      <Row>
        <Select value={operator} onChange={handleChange(setOperator)}>
          <MenuItem value="=">=</MenuItem>
          <MenuItem value=">">&gt;</MenuItem>
          <MenuItem value="<">&lt;</MenuItem>
          <MenuItem value=">=">&ge;</MenuItem>
          <MenuItem value="<=">&le;</MenuItem>
        </Select>
        <TextField
            placeholder="Query by score..."
            value={scoreQueryString}
            className={classes.input}
            onChange={handleChange(setScoreQueryString)}
            style={{ flex: 1 }}
          />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!nameQueryString && !subjectQueryString && !scoreQueryString}
          onClick={handleMultiQuery}
        >
          Query
        </Button>
      </Row>
      <Row>
        <Button onClick={() => handleSort("name")} style={{ margin: "5px", background: "#ffe58f"}}>Sort by Name</Button>
        <Button onClick={() => handleSort("subject")} style={{ margin: "5px", background: "#ffe58f"}}>Sort by Subject</Button>
        <Button onClick={() => handleSort("score")} style={{ margin: "5px", background: "#ffe58f"}}>Sort by Score</Button>
      </Row>
      <ContentPaper variant="outlined">
        {isDataQuery ? dataQuery: messages.map((m, i) => (
         ( i < (page+1)*5 && i >= (page)*5) ? 
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            { m.message }
          </Typography>: null
        ))}
      </ContentPaper>
      <Row>
        <Button onClick={() => handlePageChange(-1)} style={{ margin: "5px", background: "#f0f0f0"}}>Last Page</Button>
        <Button onClick={() => handlePageChange(1)} style={{ margin: "5px", background: "#f0f0f0"}}>Next Page</Button>
        No. 
        <Select value={dataId} onChange={handleDataQuery}>
          {pageOptions}
        </Select> 
        records
      </Row>
    </Wrapper>
    
  );
};

export default Body;

