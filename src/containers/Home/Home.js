import React from 'react';

class Home extends React.Component {

    static async getInitialProps(){
       const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({appName: "Super App"});
            }, 1000);
       });
       return await promise;
    }

    render(){
        return (
           <div>{this.props.appName}</div>
        );
    }
}

export default Home;