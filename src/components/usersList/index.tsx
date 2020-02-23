import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import './styles.scss';

interface IUsers {
    id: number, 
    email:string, 
    first_name:string, 
    last_name:string, 
    avatar:string
}

type usersListState ={
    currentPage: number,
    totalPages: number,
    dataLength: number,
    users: IUsers[]
}
  
class UsersList extends React.Component<any, usersListState> {
    state:usersListState = {
      currentPage: 0,
      totalPages:0,
      dataLength: 0,
      users: []
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData = () => {
        let url = 'https://reqres.in/api/users?'
        if(this.state.currentPage > 0 ) {
            url = url.concat('page='+ (this.state.currentPage+1))
        }
        axios.get(url)
          .then(res => {
            this.setState(state => ({
                ...state,
                currentPage: res.data.page,
                totalPages: res.data.total_pages,
                dataLength: res.data.total,
                users: this.state.users.concat(res.data.data),
            }))
          });
    }
  
    render() {
        // Users are duplicated to view the infinite scroll component better
        // Last component does not have an extra <hr> because if check fails
        return(
            <div className="user-list">
                <InfiniteScroll
                    loadMore={this.fetchData}
                    hasMore={this.state.currentPage !== this.state.totalPages ? true : false}
                    loader={<span key="loader">Loading ...</span>}
                >
                        {this.state.users.map((user, index) => (
                            <div key={index}>
                                <div className="user-card">
                                    <img src={user.avatar} alt={user.first_name}/>
                                    <span>{user.first_name} {user.last_name}</span>
                                </div>
                                {user.id !== this.state.dataLength ? <hr /> : null}
                                <div className="user-card">
                                    <img src={user.avatar} alt={user.first_name}/>
                                    <span>{user.first_name} {user.last_name}</span>
                                </div>
                                {user.id !== this.state.dataLength ? <hr /> : null}
                            </div>
                            
                        ))}
                        {this.state.currentPage === this.state.totalPages 
                            ? <div className="end-message"><i>No more users to show!</i></div> 
                            : null}
                </InfiniteScroll>
            </div>
        );
    }
}

export default UsersList