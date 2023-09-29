// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

interface DataParams {
  q: string
  status: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Partners
export const fetchData = createAsyncThunk('appPartners/fetchData', async (params: DataParams) => {
  const response = await axios.get('/apps/partners/list', {
    params
  })

  console.log(' !!!!!!!!!!!!!!!! response : ', response)

  return response.data
})

// ** Add Partner
export const addPartner = createAsyncThunk(
  'appPartners/addPartner',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/apps/partner/add-partner', {
      data
    })
    dispatch(fetchData(getState().partner.params))

    return response.data
  }
)

// ** Update Partner
export const updatePartner = createAsyncThunk(
  'appPartners/updatePartner',
  async (data: { [key: string]: any }, { getState, dispatch }: Redux) => {
    console.log(' -------------------------------------- data :::: ', data)

    const response = await axios.put('/apps/partner/update-partner', {
      data: data.partner
    })
    dispatch(fetchData(getState().partner.params))

    // data.successCallback()

    return response.data
  }
)

export const appPartnersSlice = createSlice({
  name: 'appPartners',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.partners
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appPartnersSlice.reducer
