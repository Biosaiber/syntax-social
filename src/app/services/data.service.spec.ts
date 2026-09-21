import { TestBed } from "@angular/core/testing";
import { DataService } from "./data.service";

describe('DataService', () => {
    let dataService: DataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        dataService = TestBed.inject(DataService);
    })

    it('should be created', () => {
        expect(dataService).toBeTruthy();
    });


    it('should toggle like on a post', () => {
        const postBefore = dataService.getPost(1)();

        expect(postBefore).toBeTruthy();

        dataService.toggleLike(1);

        const postAfter = dataService.getPost(1)();

        expect(postAfter?.isLiked).toBe(!postBefore?.isLiked);

        const expectedLikes = postBefore!.isLiked
            ? postBefore!.likes - 1
            : postBefore!.likes + 1;

        expect(postAfter?.likes).toBe(expectedLikes);
    });
});