import {SagaIterator} from 'redux-saga'
import {call} from 'redux-saga/effects'

type SagaStarter = () => SagaIterator

// Collection of all saga tasks to initiate
const sagas: SagaStarter[] = [] // Add domain saga entry points here

/** Entry point to start running all initial saga tasks */
export default function* saga(): SagaIterator {
  yield sagas.map(call)
}
