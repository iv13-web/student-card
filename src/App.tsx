import {HashRouter, Route, Switch} from 'react-router-dom'
import {Main} from './pages/Main'
import {Create} from './pages/Create'

export default function App() {
	return (
		<HashRouter basename='/'>
			<Switch>
				<Route exact path='/' component={Main}/>
				<Route exact path='/create' component={Create}/>
			</Switch>
		</HashRouter>
	)
}
