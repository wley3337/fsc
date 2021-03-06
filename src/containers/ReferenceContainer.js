import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'

import ReferenceSearchBar from '../components/ReferenceSearchBar'


class ReferenceContainer extends React.PureComponent{

    componentDidMount(){
        this.props.getCategories()
        this.props.getReferences(this.props.referenceOffsetId)   
    }

    handleFilterSelectionOnSearch = () =>{
        switch(this.props.ownerFocus){
            case "myReference":
            return this.filterForCatId(this.props.references)
        //    this is for a search term possiblity
        //    .filter(item => item.reference.title.toLowerCase().includes(this.props.searchTerm))

            case "references":
            return this.filterForCatId(this.props.publicReferences)
            //    this is for a search term possiblity
            // .filter(item => item.reference.title.toLowerCase().includes(this.props.searchTerm))
    
            default:
           return []  

        }
    }

    filterForCatId =(referenceArray)=>{
    return this.props.referenceSearchCategoryId ?  
        referenceArray.filter(item =>{ return item.categories.find(cat => cat.id === this.props.referenceSearchCategoryId)})
     :  referenceArray;
    }

    checkForSavedReference=(id) =>{
        const refArray =[]
        for(const object of this.props.references){
            object.reference.id === id ? refArray.push(id) : null
        }
        return refArray.length > 0 ? true : false
    }

    handleReferenceAlreadyExists = () =>{
        this.props.setOwnerFocus('myReference')
        return <p 
                id ="select-reference-container-already-exists"
                onClick={this.props.clearExistingReference}
                >Reference already exists and has been added to your saved references as:
                <br></br>  
                <span id="select-reference-container-already-exists-title">{this.props.existingReference[0].title}</span>
                <br></br> 
                <span id="select-reference-container-already-exists-click-to-dismiss">click to dismiss</span>
                </p>
    }

    render(){
        return(
            <div id="select-reference-container">
            <ReferenceSearchBar />
                
            <div id="select-reference-links">
            {this.props.existingReference.length > 0 ? this.handleReferenceAlreadyExists() : null}
                { this.handleFilterSelectionOnSearch().map(item => 
                    <div key={item.reference.id}>
                        <a    
                            href={item.reference.link}
                            target="_blank"
                            className="select-reference-link-item"
                        >
                            {item.reference.title}
                        </a> 
                    {this.props.ownerFocus === 'myReference' ? 
                            <button onClick={() => this.props.removeReferenceToUser(item.reference.id)}>Remove</button> 
                        :
                            this.checkForSavedReference(item.reference.id) ? 
                            <p>Already Saved</p>
                            :
                            <button onClick={() => this.props.saveReferenceToUser(item.reference.id)}>Add To My References</button>
                        }

                    
                    </div> 
                )}

                
            </div>
            {this.props.ownerFocus === "references" ? 
                            <div className="last-next-button-container">
                                {this.props.referenceHistory.length > 0 ? 
                                    <button
                                        onClick={()=> this.props.lastReferences(this.props.referenceHistory)}
                                        className="last"
                                    >Last 300</button> 
                                : null}
                                {this.props.moreReferences ? 
                                    <button 
                                        className="next"
                                        onClick={()=> this.props.nextReferences(this.props.referenceOffsetId,this.props.publicReferences)}
                                    >Next 300</button> 
                                : null}
                            </div>
                        : 
                            null
                        }
        </div>
        )
    }

}

const mapPropsToState = (state) =>{
    return{
        ownerFocus: state.ownerFocus, //used for setting focus in menues
        references: state.references, // only seems to be used to see if a reference exists **this could be moved into a thunk action
        referenceOffsetId: state.referenceOffsetId,//only used as dispatch reference ** This could be moved into a thunk action- being added as argument for nextReferences()
        publicReferences: state.publicReferences, //used as a set for filtering displayed references based off of a filter search
        referenceSearchCategoryId: state.referenceSearchCategoryId, //used for filtering references by category
        existingReference: state.existingReference, //used to display the existing reference to the user 
        referenceHistory: state.referenceHistory,//used to display if there is a back button and to load that array as the previous set of references
        moreReferences: state.moreReferences //used as a boolean value to display next button
    }
}

export default connect(mapPropsToState, actions)(ReferenceContainer)