import { request } from '../request';
import {
  IGetRatingsResponse,
  IPlayerRatingResponse,
  ISuccessResponse,
  IGetRatingsRequest,
  ISavePlayerScoreRequest,
} from '../entities';

export const getRatings = (params: IGetRatingsRequest): Promise<ISuccessResponse<IGetRatingsResponse>> =>
  request<ISuccessResponse<IGetRatingsResponse>>({
    url: '/rating',
    params,
  });

export const getPlayerRating = (player: string): Promise<ISuccessResponse<IPlayerRatingResponse>> =>
  request<ISuccessResponse<IPlayerRatingResponse>>({
    url: `/rating/${player}`,
  });

export const savePlayerScore = (data: ISavePlayerScoreRequest): Promise<ISuccessResponse> =>
  request<ISuccessResponse>({
    url: '/rating',
    method: 'PUT',
    data,
  });
