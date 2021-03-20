import Word from '@/models/Word'
import Gym from '@/models/Gym'
import Crag from '@/models/Crag'
import CragRoute from '@/models/CragRoute'
import CragSector from '@/models/CragSector'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPdf from '@/models/GuideBookPdf'
import GuideBookWeb from '@/models/GuideBookWeb'
import Video from '@/models/Video'
import Alert from '@/models/Alert'
import Photo from '@/models/Photo'
import AscentCragRoute from '@/models/AscentCragRoute'
import User from '@/models/User'

export const RecordToObjectHelpers = {
  methods: {
    recordToObject: function (type, data) {
      if (type === 'Word') {
        return new Word(data)
      } else if (type === 'Gym') {
        return new Gym(data)
      } else if (type === 'Crag') {
        return new Crag(data)
      } else if (type === 'CragRoute') {
        return new CragRoute(data)
      } else if (type === 'CragSector') {
        return new CragSector(data)
      } else if (type === 'GuideBookPaper') {
        return new GuideBookPaper(data)
      } else if (type === 'GuideBookPdf') {
        return new GuideBookPdf(data)
      } else if (type === 'GuideBookWeb') {
        return new GuideBookWeb(data)
      } else if (type === 'Video') {
        return new Video(data)
      } else if (type === 'Alert') {
        return new Alert(data)
      } else if (type === 'Photo') {
        return new Photo(data)
      } else if (type === 'AscentCragRoute') {
        return new AscentCragRoute(data)
      } else if (type === 'User') {
        return new User(data)
      }
    }
  }
}
