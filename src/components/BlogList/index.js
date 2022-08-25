// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import BlogItem from '../BlogItem'
import './index.css'

class BlogList extends Component {
  state = {isLoading: true, blogsData: []}

  componentDidMount = () => {
    this.BlogsData()
  }

  BlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const status = await response.statusCode
    console.log(status)
    const data = await response.json()

    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))

    this.setState({blogsData: formattedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state

    return (
      <div className="display" testId="loader">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(eachItem => (
            <BlogItem key={eachItem.id} blogData={eachItem} />
          ))
        )}
      </div>
    )
  }
}
export default BlogList
