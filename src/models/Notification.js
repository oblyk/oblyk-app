import ActiveData from '@/models/ActiveData'
import User from '@/models/User'
import Article from '@/models/Article'
import ConversationMessage from '@/models/ConversationMessage'

export default class Notification extends ActiveData {
  get Notifiable () {
    if (this.notifiable_type === 'User') return new User(this.notifiable_object)
    if (this.notifiable_type === 'ConversationMessage') return new ConversationMessage(this.notifiable_object)
    if (this.notifiable_type === 'Article') return new Article(this.notifiable_object)
  }

  get Parent () {
    if (this.notifiable_type === 'ConversationMessage') return new User(this.parent_object)
  }

  get thumbnailImageUrl () {
    if (this.notifiable_type === 'ConversationMessage') return this.Parent.thumbnailAvatarUrl()
    if (this.notifiable_type === 'User') return this.Notifiable.thumbnailAvatarUrl()
    if (this.notifiable_type === 'Article') return this.Notifiable.thumbnailCoverUrl()
  }
}
