package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.Corporate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Corporate entity.
 */
public interface CorporateSearchRepository extends ElasticsearchRepository<Corporate, Long> {
}
