import hh from 'hyperscript-helpers';
import {h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const { div, button } = hh(h);
const initModel = 0;

function view(dispatch, model){
	return div([
div({className: 'col-md-5'}, `Count: ${model}`),
button({className: 'btn btn-primary mr-2', 
onclick: ()=> dispatch(MSGS.ADD) },'+'),
button({className: 'btn btn-secondary', 
onclick: ()=> dispatch(MSGS.SUBTRACT) },'-'),
		]);
}

const MSGS = {
	ADD: 'ADD',
	SUBTRACT: 'SUBTRACT'
};

function update(msg, model){
switch(msg){
	case MSGS.ADD:
	return model + 1;
	case MSGS.SUBTRACT:
	return model - 1;
	default: 
	return model;
}
}

function app(initModel, update, view, node){
 let model = initModel;
 let currentView = view(dispatch, model);
 let rootNode = createElement(currentView);
 node.appendChild(rootNode);
 function dispatch(msg){
 model = update(msg, model);
 const updateView = view(dispatch, model);
 const patches = diff(currentView, updateView);
 rootNode = patch(rootNode, patches);
 currentView = updateView;
  }
}
const rootNode = document.getElementById('app');
app(initModel, update, view, rootNode);

// rootNode.appendChild(view(update('minus', initModel)));