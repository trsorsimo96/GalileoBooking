package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.Segment;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Segment entity.
 */
public interface SegmentSearchRepository extends ElasticsearchRepository<Segment, Long> {
}
