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
import Article from '@/models/Article'

export const RecordToObjectHelpers = {
  methods: {
    recordToObject (type, data) {
      if (type === 'Word') {
        return new Word({ attributes: data })
      } else if (type === 'Gym') {
        return new Gym({ attributes: data })
      } else if (type === 'Crag') {
        return new Crag({ attributes: data })
      } else if (type === 'CragRoute') {
        return new CragRoute({ attributes: data })
      } else if (type === 'CragSector') {
        return new CragSector({ attributes: data })
      } else if (type === 'GuideBookPaper') {
        return new GuideBookPaper({ attributes: data })
      } else if (type === 'GuideBookPdf') {
        return new GuideBookPdf({ attributes: data })
      } else if (type === 'GuideBookWeb') {
        return new GuideBookWeb({ attributes: data })
      } else if (type === 'Video') {
        return new Video({ attributes: data })
      } else if (type === 'Alert') {
        return new Alert({ attributes: data })
      } else if (type === 'Photo') {
        return new Photo({ attributes: data })
      } else if (type === 'AscentCragRoute') {
        return new AscentCragRoute({ attributes: data })
      } else if (type === 'User') {
        return new User({ attributes: data })
      } else if (type === 'Article') {
        return new Article({ attributes: data })
      }
    }
  }
}
